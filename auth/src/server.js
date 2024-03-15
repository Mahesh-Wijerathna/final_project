require('dotenv').config();
const mongoose = require('mongoose');
const port = process.env.PORT || 10001;

const app = require('./app');

mongoose.connect(
    process.env.MONGO_URL,
    {}).then(result => {
        console.log('Connected to MongoDB Authentication Database');
        app.listen(port,() => {
            console.log(`Auth Server is running on port ${port}`);
        });
    }).catch(err => {
        console.log(err);
    });