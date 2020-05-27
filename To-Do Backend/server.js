const express = require ('express');
const app = express ();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + ''));
});


// require('dotenv/config');

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//import routes
const taskRoutes = require('./routes/task');

app.use('/tasks',taskRoutes);


// Connect to DB
mongoose.connect('mongodb://localhost:27017/practice', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true} , function(err){
    
    if (err){
        console.log('Not connected to the Database' + err);
    } else {
        console.log('Successfully connected to the Database');
    }
});


// start listening to the server
app.listen(8080);