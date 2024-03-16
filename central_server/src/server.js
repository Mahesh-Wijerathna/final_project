require('dotenv').config();
const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');
const verify = require('./verify');

const port = process.env.PORT || 10000;
const app = express();
app.use(cors());





app.use('/auth'       , proxy('https://final-project-xp60.onrender.com:10001'));
app.use('/tourist'    , proxy('http://localhost:4002'));
app.use('/m_center'   , proxy('http://localhost:4003'));
app.use('/destination', proxy('http://localhost:4004'));
app.use('/appointment', proxy('http://localhost:4005'));
app.use('/',(req,res,next) => {
    return res.status(200).json({message: 'Welcome to the central server'});
});
app.listen(port, () => {
    console.log(`Central server running on port ${port} ...`);
});
