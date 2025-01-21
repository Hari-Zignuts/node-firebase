require('dotenv').config({ path: `${process.cwd()}/.env` });

const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');


app.use(express.json()); // To parse JSON request bodies

// Use authentication routes
app.use('/api/v1/firebase/auth', authRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
