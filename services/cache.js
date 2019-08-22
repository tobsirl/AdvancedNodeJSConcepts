const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');

const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
client.get = util.promisify(client.get); // promisify client.get

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = function() {
  console.log("I'm about to run a query");

  // console.log(this.getQuery());
  // console.log(this.mongooseCollection.name);
  const key = Object.assign({}, this.getQuery(), {
    collection: this.mongooseCollection.name
  });

  console.log(key);

  return exec.apply(this, arguments);
};
