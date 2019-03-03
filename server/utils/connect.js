const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "mock";

const connect = (tableName, callback) => {
  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    function(err, client) {
      assert.equal(null, err);

      const db = client.db(dbName);
      callback(db.collection(tableName));
      client.close();
    }
  );
};

exports.insertMany = (tableName, condition, params) => {
  return new Promise((resolve, reject) => {
    connect(
      tableName,
      collection => {
        collection.insertMany(condition, params, (err, result) => {
          if (err) {
            console.log(err);
            reject();
          } else {
            resolve(result);
          }
        });
      }
    );
  });
};

exports.findMany = (tableName, condition) => {
  return new Promise((resolve, reject) => {
    connect(
      tableName,
      collection => {
        collection.find(condition).toArray((err, result) => {
          if (err) {
            console.log(err);
            reject();
          } else {
            resolve(result);
          }
        });
      }
    );
  });
};
