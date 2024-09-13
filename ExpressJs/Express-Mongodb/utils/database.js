const mongodb = require("mongodb");
const mongodbClient = mongodb.MongoClient;
const dotnev = require("dotenv").config();
// dotnev.config()

const mongodbConnector = () => {
  mongodbClient
    .connect(process.env.MONGODB_URL)
    .then((result) => {
      console.log("Connected to database");
      console.log(result);
    })
    .catch((err) => console.log(err));
};

module.exports = mongodbConnector;
