import client from './redisClient';

//Add url
const addUrl = (key, field, val) => {
  client.on("error", (err) => { console.log("Error " + err);});
  client.set("string field", "string val");
  client.hset(key, field, val);
};

//Get all urls
const getUrls = (key) => {
  client.hgetall(key, (err,obj) => {
    console.dir(obj);
  });
};


export default { addUrl, getUrls };