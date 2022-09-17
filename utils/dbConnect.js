const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const dbConnect = () => {
  mongoose
    .connect(process.env.DATABASE_LOCAL)
    .then(() => console.log('Database Connection is successful'.green.bold));
};

module.exports = dbConnect;
