const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // Import path module
const apiRoutes = require('./routes/api');
require('dotenv').config();

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true, // Allow cookies or other credentials
  })
);
  
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files
app.use('/api', apiRoutes);

// Serve static files from the Frontend 'dist' folder
const frontendDistPath = path.join(__dirname, '../Frontend/dist');
app.use(express.static(frontendDistPath));

// Catch-all route to ser ve the React app for any other request
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDistPath, 'index.html'));
});

const port = process.env.PORT || 5600;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
