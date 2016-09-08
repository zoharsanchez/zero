import axios from 'axios';
import { isURL } from 'validator';

export default function(app) {

  //API ROUTES

  //////////////////////////////////////////////
  //SLACK MESSAGE DATA ROUTE
  //////////////////////////////////////////////
  app.get('/messages', (req,res) => {

    //TODO: add to db instead of links object
    const links = {};

    //Parse slack data and add key:value pairs to links
    const parseData = (obj) => {
      if (obj.attachments) {
        if (obj.attachments[0].title) {
          links[obj.attachments[0].title] = obj.attachments[0].title_link;
        }
      } else {
          //If url is enclosed in carrots remove them
          if (obj.text[0] === '<') {
            obj.text = obj.text.slice(1,obj.text.length-1);
          }
          //Check to see if text is valid url
          if (isURL(obj.text)) {
            links[obj.text] = obj.text;
          }
      }
    };
    
    //GET request to slack api endpoint for all messages containing http
    axios.get(`https://slack.com/api/search.messages?token=${process.env.SLACK_TOKEN}&query=http&pretty=1`)
      .then((response) => {
        response.data.messages.matches.forEach((obj) => {
          for (let keys in obj) {
            if (keys === 'attachments') {
              links[obj[keys][0].title] = obj[keys][0].title_link;
            } else if (keys === 'previous') {
                parseData(obj[keys]);
            } else if (keys === 'previous_2') {
                parseData(obj[keys]);
            } else if (keys === 'next') {
                parseData(obj[keys]);
            } else if (keys === 'next_2') {
                parseData(obj[keys]);
            }
          }
        });
        res.send(JSON.stringify(links));
      })
      .catch((err) => {
        console.log(`error: ${err}`);
      });

  });

};