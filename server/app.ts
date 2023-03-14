import app from './app/index'


const port = 3001;

app.listen(port, () => {
  console.log(`PokeTracker server listening on port ${port}`);
});
