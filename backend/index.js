

const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser'); 
const cors = require('cors');
// eslint-disable-next-line no-unused-vars
const mongoDB = require('./db');
app.use(cors());

// ... other routes and middleware ...



app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use(express.json());
app.use(bodyParser.json());
app.use('/api', require('./routes/Createuser'));
app.use('/api', require('./routes/Login'));
app.use('/api', require('./routes/Displaydata'));
app.use('/api', require('./routes/AddData'));
app.use('/api', require('./routes/Createvender'));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});