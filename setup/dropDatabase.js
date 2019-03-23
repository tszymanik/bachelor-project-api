require('dotenv').config();
const mongoose = require('mongoose');

const dropDatabase = async () => {
  await mongoose.connect(process.env.DB_CONNECTION);
  console.log('Connected to database.');
  await mongoose.connection.db.dropDatabase();
  console.log('Database dropped.');
  await mongoose.connection.close();
  console.log('Connection ended.');
};

dropDatabase();
