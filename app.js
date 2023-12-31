const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connecDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/errorHandler');
//middleware

app.use(express.static('./public'));
app.use(express.json());
//routes
app.get('/hello', (req, res) => {
  res.send('Task manager app');
});

app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connecDB(process.env.MONGO_URI);
    app.listen(port, console.log('Server is listening...'));
  } catch (error) {
    console.log(error);
  }
};

start();
