const firebaseAdmin = require('../config/firebaseAdmin');
const { auth } = require('../config/firebase');
const { signInWithEmailAndPassword, sendPasswordResetEmail, signOut, sendEmailVerification, updateProfile } = require('firebase/auth');

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return res.status(200).json({
      status: 'success',
      message: 'User logged in successfully',
      data: userCredential.user
    });
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(400).json({
      status: 'fail',
      message: 'An error occurred while logging in. Please try again later.',
      error: error.message
    });
  }
}

const signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, userType } = req.body;
  const displayName = `${firstName} ${lastName}`;
  try {
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    // Create user with Firebase Authentication
    const userRecord = await firebaseAdmin.auth().createUser({
      email,
      password,
      displayName,
    });

    // Save additional user details in Firestore
    const userRef = firebaseAdmin.firestore().collection('users').doc(userRecord.uid);
    await userRef.set({
      firstName,
      lastName,
      userType,
      email
    });

    res.status(201).json({
      status: 'success',
      message: 'User created successfully.',
      data: {
        userRecord,
        userRef,
      },
    });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
}

const signout = async (req, res) => {
  try {
    await signOut(auth);
    res.status(200).json({ status: 'success', message: 'User signed out successfully' });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: 'An error occurred while signing out' });
  }
}

const resetPassword = async (req, res) => {
  if(!auth.currentUser) {
    return res.status(401).json({ status: 'fail', message: 'User not logged in' });
  }
  const email = auth.currentUser.email;
  try {
    await sendPasswordResetEmail(auth, email);
    res.status(200).json({ status: 'success', message: 'Password reset email sent' });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: 'An error occurred while sending the password' });
  }
}

const currentUser = async (req, res) => {
  const user = auth.currentUser;
  if (!user) {
    return res.status(401).json({ status: 'fail', message: 'User not logged in' });
  }
  res.status(200).json({ status: 'success', user });
}

const updateUserProfile = async (req, res) => {
  const user = auth.currentUser;
  console.log(req.body)
  const { firstName, lastName } = req.body;
  if (user) {
    try {
      const displayName = `${firstName} ${lastName}`;
      await updateProfile(user, { displayName });
      await firebaseAdmin.firestore().collection('users').doc(user.uid).update({
        firstName,
        lastName,
      });
      return res.status(200).json({ status: 'success', message: 'User profile updated successfully' });
    } catch (error) {
      return res.status(400).json({ status: 'fail', message: error.message });
    }
  }
  return res.status(401).json({ status: 'fail', message: 'User not logged in' });
}

const sendVerificationEmail = async (req, res) => {
  const user = auth.currentUser;
  try {
    await sendEmailVerification(user);
    res.status(200).json({ status: 'success', message: 'Verification email sent' });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: 'An error occurred while sending the verification email' });
  }
}

const deleteUser = async (req, res) => {
  const user = auth.currentUser;

  // Check if the user is logged in
  if (!user) {
    return res.status(401).json({ status: 'fail', message: 'User not logged in' });
  }

  try {
    // Delete the user document from Firestore
    const userRef = firebaseAdmin.firestore().collection('users').doc(user.uid);
    await userRef.delete();

    // Sign the user out
    await signOut(auth);

    // Delete the user account
    await user.delete();

    res.status(200).json({ status: 'success', message: 'User deleted successfully' });
  } catch (error) {
    // Log the error and provide detailed message
    console.error('Error deleting user:', error);
    
    // Determine if the error is related to Firebase authentication or Firestore
    if (error.code === 'auth/requires-recent-login') {
      return res.status(401).json({
        status: 'fail',
        message: 'Recent sign-in required to delete account. Please re-sign in and try again.',
      });
    }

    // General error message for any other issues
    res.status(500).json({ 
      status: 'fail', 
      message: 'An error occurred while deleting the user. Please try again later.',
    });
  }
};


module.exports = {
  login,
  signup,
  signout,
  resetPassword,
  currentUser,
  updateUserProfile,
  sendVerificationEmail,
  deleteUser,
}
