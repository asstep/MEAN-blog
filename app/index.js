const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');

const config = require('./config/db');
const accout = require('./routes/account');
const Post = require('./models/post');

const app = express();
const port = 3000;

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use(cors())

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    limit: 1000000
}));

// Database connection
mongoose.connect(config.db,  { useNewUrlParser: true, useUnifiedTopology: true }, (res) => {
    console.log('connect', res);
} );
mongoose.connection.on('connected', () => {
    console.log('Successful connection to DB');
})
mongoose.connection.on('error', () => {
    console.log('Error connection to DB');
})


// Server run
app.listen(port, () => {
    console.log('Server is running on port: ' + port)
})

app.get('/', (req, res) => {
    Post.find().then( posts => {
        res.json(posts)
    })
})

app.use('/account', accout);
