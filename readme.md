# Node.js + Firebase User Management

This project demonstrates a user management system using Node.js and Firebase, including authentication and Firestore for data storage.

## Features

- User authentication (login, signup, signout)
- Password reset
- User profile update
- Email verification
- User deletion

## Endpoints

- `POST /api/v1/firebase/auth/login` - User login
- `POST /api/v1/firebase/auth/signup` - User signup
- `GET /api/v1/firebase/auth/signout` - User signout
- `GET /api/v1/firebase/auth/currentUser` - Get current user
- `POST /api/v1/firebase/auth/resetPassword` - Reset password
- `PUT /api/v1/firebase/auth/updateProfile` - Update user profile
- `POST /api/v1/firebase/auth/sendVerificationEmail` - Send verification email
- `DELETE /api/v1/firebase/auth/deleteUser` - Delete user

## Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/Hari-Zignuts/node-firebase
    cd node-firebase
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up Firebase:
    - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
    - Enable Email/Password authentication in the Authentication section.
    - Create a Firestore database.


4. Configure Firebase Admin SDK:
    - Download the service account key from the Firebase Console and save it as `serviceAccountKey.json` inside the `config` folder.

5. Set up environment variables:
    - Create a `.env` file in the root directory with the following content:
        ```env
        APP_PORT=5000
        FIREBASE_API_KEY=AIzaSyAymW52dhq7kOXlBZlKrbgkhzHg5DeYCBA
        FIREBASE_AUTH_DOMAIN=fir-a5d3e.firebaseapp.com
        FIREBASE_PROJECT_ID=fir-a5d3e
        FIREBASE_STORAGE_BUCKET=fir-a5d3e.firebasestorage.app
        FIREBASE_MESSAGING_SENDER_ID=1022559819459
        FIREBASE_APP_ID=1:1022559819459:web:d75d14e15582a39e907476
        FIREBASE_MEASUREMENT_ID=G-N1F5H0B9PF
        ```

6. Start the server:
    ```sh
    npm start
    ```

## Usage

Use a tool like Postman to test the endpoints. Ensure you include the necessary headers and body parameters as required by each endpoint.

## Dependencies

- [express](https://www.npmjs.com/package/express)
- [firebase](https://www.npmjs.com/package/firebase)
- [firebase-admin](https://www.npmjs.com/package/firebase-admin)

## License

This project is licensed under the MIT License.