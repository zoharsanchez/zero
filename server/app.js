import express from 'express';
import path from 'path';
import slackRoutes from './routes/slackRoutes';
import redis from './db/redis';

const app = express();
const port = process.env.PORT || 8020;

app.use(express.static(path.join(__dirname,'../client')));

slackRoutes(app);

app.listen(port,() => {
  console.log(`app.js has been served on port: ${port}`);
});