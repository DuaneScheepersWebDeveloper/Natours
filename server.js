const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Handle uncaught exceptions
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

// Load environment variables from config file
dotenv.config({ path: './config.env' });

// Import the app (Express) from the app.js file
const app = require('./app');

// Replace the <PASSWORD> placeholder in the DB string with the actual password from the environment variables
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

// Connect to the MongoDB database
mongoose
  .connect(DB, {
    useNewUrlParser: true,         // Use the new URL string parser
    useFindAndModify: false,       // Prevent MongoDB from using deprecated findAndModify
    useUnifiedTopology: true,      // Use the new server discovery and monitoring engine
    ssl: true,                     // Enable SSL for secure connections (important for cloud-based databases like MongoDB Atlas)
  })
  .then(() => {
    console.log('DB connection successful');
  })
  .catch(err => {
    console.error('DB connection error:', err);  // Log any connection errors
  });

// Log connection errors after establishing the connection
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

// Log a successful connection once MongoDB is connected
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB successfully');
});

// Optional: Capture any errors during index creation
mongoose.connection.on('index', (err) => {
  if (err) {
    console.error('Index creation failed:', err);  // Log any errors related to index creation
  } else {
    console.log('Indexes created successfully');   // Confirm successful index creation
  }
});

// Define the port from environment variables or use default (3000)
const port = process.env.PORT || 3000;

// Start the server and listen on the specified port
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);

  // Gracefully shut down the server and exit
  server.close(() => {
    process.exit(1);
  });
});
