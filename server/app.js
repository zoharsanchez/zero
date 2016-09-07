import express from 'express';
import path from 'path';
import routes from './routes/entry';

const app = express();
const port = process.env.PORT || 8020;

app.use(express.static(path.join(__dirname,'../client')));

routes(app);

app.listen(port,() => {
  console.log(`app.js has been served on port: ${port}`);
});