require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();


const Router = require('./routes');

app.use(express.json());




app.use(cors());
app.use('/api/v1/auth', Router);    




app.get('/', (req, res,next) => {
    res.send('Welcome to the Auth API!');
});

module.exports = app;









