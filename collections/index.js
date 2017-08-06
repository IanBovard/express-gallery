/* jshint esversion:6 */

const { MongoClient } = require('mongodb');
const mongoConnectionString = 'mongodb://localhost:27017/galleryMeta';

let photoMetas = null;
MongoClient.connect(mongoConnectionString, function(err, connectedDb) {
  console.log(`Successfuly connected to ${mongoConnectionString}!`);
  let mongoDb = connectedDb;

  photoMetas = mongoDb.collection('photoMetas');

});

module.exports = {
  photoMetas: () => photoMetas
};