//todo what is this npm?
const mongoose = require("mongoose");

//todo what is this npm?
const config = require("config");

//todo what is this?
const db = config.get("mongoURI");

//exported to server.js file
const connectDB = async () => {
  try {
    //todo what is the definition of this method?
    mongoose.connect(db, {
      //these are for mongoose errors (deprecations).
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    //exit process with failure
    //todo wtf is this?
    process.exit(1);
  }
};

module.exports = connectDB;
