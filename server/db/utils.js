import client from './redisClient';

//Returns if field exists in hash at key
const hashExists = (key, field) => {
  return client.hexists(key, field);
};

//Add url
const addUrl = (key, field, val) => {
  client.on("error", (err) => { console.log("Error " + err);});
  client.set("string field", "string val");

  if (!hashExists(key, field)) {
    client.hset(key, field, val);
  };
  getUrls(key);
};

//Get all urls
const getUrls = (key) => {
  client.hgetall(key, (err,obj) => {
    console.dir(obj);
  });
};


export default { addUrl, getUrls };