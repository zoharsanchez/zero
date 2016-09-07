export default function(app) {
  app.get('/test', (req,res) => {
    res.send('hello!');
  });
};