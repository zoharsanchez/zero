import slackData from '../db/db';

export default function(app) {

  // API ROUTES

  //////////////////////////////////////////////
  //SLACK DATA ROUTE
  //////////////////////////////////////////////
  app.get('/data', (req,res) => {
    const links = {};

    const parseData = (obj) => {
      if (obj.attachments) {
        // TODO: need regex to see if text is url or not
        if (obj.attachments[0].title) {
          links[obj.attachments[0].title] = obj.attachments[0].title_link;
        }
      } else {
        links[obj.text] = obj.text;
      }
    };

    slackData.messages.matches.forEach((obj) => {
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

    console.log(links);
    res.json(links);
  });
};