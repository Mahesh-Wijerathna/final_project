require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    console.log("Token: ", token);

    if (!token) {
        res.status(401).send('Token not provided');
    }
// console.log("JWT Token Key : " , process.env.JWT_TOKEN);

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        // console.log("Decoded: ", decoded);
        req.user = decoded;
        return next();
    } catch (error) {
        res.status(400).send('Invalid token');
    }


}