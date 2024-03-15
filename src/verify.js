const axios = require('axios');


module.exports = async function (req, res, next) {
    console.log("Inside verifyToken.js");
    //return next();
    //const token = req.query.token || req.headers['x-access-token'];
    const token = "yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWVkOTUyNzQ0NTM5ODU4NzNmMmI1MmEiLCJ1c2VybmFtZSI6ImRldkBkZXYuZGV2IiwiaWF0IjoxNzEwMTIwMjQ4LCJleHAiOjE3MTAxNDE4NDh9.7Hdi-dVrfj1_Caj5MJguAskZHrKmQxqb2XrfPLkDrlY";
     console.log("Token: ", token);

    if (!token) {
        res.status(401).send('Token not provided');
    }
// console.log("JWT Token Key : " , process.env.JWT_TOKEN);

    try {
        console.log("Try to call auth service to verify token");
        await axios.get(`http://localhost:4001/api/v1/auth/verifytoken?token=${token}`, {
            headers: {
                'x-access-toke': token,
                
            },
            token: token
        })
        .then((res) => {
            console.log("Response from auth service: ");
            console.log(`statusCode: ${res.statusCode}`)
            console.log(res.data)
            if(res.data === 'valid'){
                console.log("Token is valid");
                return next();
            }
        })
        .catch((error) => {
            console.error(error)
        })
        
        //req.user = decoded;
        
    } catch (error) {
        console.log(error);
        res.status(400).send('Invalid token -cc');
    }


    axios.get('/users', {
        headers: {
            'MyCustomHeader1': '1',
            'MyCustomHeader2': '2'
        }
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.error(err));


}