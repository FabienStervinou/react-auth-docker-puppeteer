const mongoose = require('mongoose');

const db = process.env.DB_CONNECT;

const connectDB = async () => {
  let attempts = 10;
  while (attempts) {  
    try {
      await mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true});
      console.log('MongoDB connected...');
      // break out of loop once conncected
      break;
    } catch (err) {
      console.log("Error on DB connection: ", err.message);
      attempts -= 1;
      console.log(`connection attempts left: ${attempts}`);
      // wait for 10 seconds before retrying
      await new Promise(res => setTimeout(res, 10000));
    }
  }
};

module.exports = { connectDB };