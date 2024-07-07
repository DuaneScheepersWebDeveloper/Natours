const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Tour = require('../../models/tourModel.js');

// Debug: Print current working directory
console.log('Current working directory:', process.cwd());

// Load environment variables
const envPath = path.resolve(__dirname, '../../config.env');
const result = dotenv.config({ path: envPath });

// Debug: Check for errors in loading the .env file
if (result.error) {
  console.error('Error loading .env file:', result.error);
  process.exit(1);
}

// Debug: Print loaded environment variables
console.log('Loaded environment variables:');
console.log(`DATABASE: ${process.env.DATABASE}`);
console.log(`DATABASE_PASSWORD: ${process.env.DATABASE_PASSWORD}`);

// Check if environment variables are loaded correctly
if (!process.env.DATABASE || !process.env.DATABASE_PASSWORD) {
  console.error('Error: DATABASE and DATABASE_PASSWORD must be defined in config.env');
  process.exit(1);
}

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    ssl: true,
  })
  .then(() => {
    console.log('DB connection successful');
  })
  .catch((err) => {
    console.error('DB connection error:', err);
  });

// Adjust path to tours.json
const toursPath = path.resolve(__dirname, './tours.json');
console.log('Path to tours.json:', toursPath);

const tours = JSON.parse(fs.readFileSync(toursPath, 'utf-8'));

// Import Data into the database
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data is now loaded');
  } catch (err) {
    console.log(err.message);
  }
};

// Delete all data from collection
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted');
    process.exit();
  } catch (err) {
    console.log(err.message);
  }
};

if (process.argv[2] === '--import') {
  importData();
  console.log('Data successfully imported');
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
