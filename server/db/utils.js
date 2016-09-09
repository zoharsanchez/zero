import client from './redisClient';
import { isURL } from 'validator';

//Parse slack response
const parseData = (obj) => {
  if (obj.attachments) {
    if (obj.attachments[0].title) {
      addUrl('urls', obj.attachments[0].title, obj.attachments[0].title_link);
    }
  } else {
      //If url is enclosed in carrots remove them
      if (obj.text[0] === '<') {
        obj.text = obj.text.replace(/[<>]/g,'');
      }
      //Check to see if text is valid url
      if (isURL(obj.text)) {
        addUrl('urls', obj.text, obj.text);
      }
  }
};

//Add url to hash
const addUrl = (key, field, val) => {
  client.on('error', (err) => { console.log('Error ' + err);});
  client.set('string field', 'string val');
  client.hset(key, field, val);
};

//Get all urls
const getUrls = (key) => {
  client.hgetall(key, (err,obj) => {
    console.dir(obj);
  });
};

export { parseData, addUrl, getUrls };