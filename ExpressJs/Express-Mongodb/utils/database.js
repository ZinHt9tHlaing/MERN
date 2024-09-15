const mongodb = require("mongodb");
const mongodbClient = mongodb.MongoClient;
const dotenv = require("dotenv").config();
// dotenv.config()

let db;

const mongodbConnector = () => {
  mongodbClient
    .connect(process.env.MONGODB_URL)
    .then((result) => {
      db = result.db();
      console.log("Connected to database");
      console.log(result);
    })
    .catch((err) => console.log(err));
};

const getDatabase = () => {
  if (db) {
    return db;
  }
  throw "No database";
};

module.exports = { mongodbConnector, getDatabase };
