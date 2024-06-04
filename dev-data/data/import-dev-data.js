const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel.js');

// Load environment variables
dotenv.config({ path: '../../config.env' });

// Check if environment variables are loaded correctly
if (!process.env.DATABASE || !process.env.DATABASE_PASSWORD) {
  console.error(
    'Error: DATABASE and DATABASE_PASSWORD must be defined in config.env',
  );
  process.exit(1);
}

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

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

const tours = JSON.parse(fs.readFileSync('./tours-simple.json', 'utf-8'));

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
  console.log('Data successfully importedmong');
} else if (process.argv[2] === '--delete') {
  deleteData();
}
console.log(process.argv);
