const mongoose = require('mongoose');
const configDB = () => {
  mongoose.Promise = global.Promise;
  mongoose
    .connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/ticket-master-bk',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log('Connection established with the mongodb');
    })
    .catch((err) => {
      console.log('Error in connection :', err);
    });
};

module.exports = configDB;
