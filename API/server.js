//const dotenv = require('dotenv');

const db = require('./config/Database');

//dotenv.config({ path: './config.env' });

const app = require('./app');

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is runn on port ${port}`);
});
