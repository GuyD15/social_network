const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes'); 

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialnetwork', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

// To check if mongoose connection is successful or not
mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected!');
});

// Use the API routes when "/api" is called
app.use('/api', routes);

// Server listening on PORT
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

