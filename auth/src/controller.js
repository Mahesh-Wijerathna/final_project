const createHttpError = require('http-errors');
const UserModel = require('./user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register =  async (req, res, next) => {
    console.log("Try to create a user");
    const username = req.body.username;
    const usertype = req.body.usertype;
    const password = req.body.password;

    try{
        if(!username || !password || !usertype){
            throw createHttpError.BadRequest('Missing required fields');
        }
        const isUserExist = await UserModel.findOne({username: username}).exec();

        if(isUserExist)
            throw createHttpError(400, 'User already exists');

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            username: username,
            usertype: usertype,
            password: hashedPassword
        });

        const result = await newUser.save();
        console.log("User saved in database successfully!");
        res.status(201).send(result);

    }
    catch{
        console.log("error in creating a user");
        console.log(err);
        next(err);
    }
}
exports.update = async (req, res, next) => {
    console.log("Try to update a user");
    
    const username = req.body.username;
    const usertype = req.body.usertype;
    const password = req.body.password;

    try{
        if(!username || !password || !usertype){
            throw createHttpError.BadRequest('Missing required fields');
        }
        const existUser = await UserModel.findOne({username: username}).exec();

        if(!existUser)
            throw createHttpError(400, 'User not found');

        const hashedPassword = await bcrypt.hash(password, 10);
        
        existUser.username = username;
        existUser.usertype = usertype;
        existUser.password = hashedPassword;



        const result = await existUser.save();
        console.log("User updated in database successfully!");
        res.status(201).send(result);

    }
    catch(err)  {
        console.log("error in updating a user");
        console.log(err);
        next(err);
    }
}
exports.delete = async (req, res, next) => {
    console.log("Try to delete a user");
    const username = req.body.username;

    try{
        if(!username){
            throw createHttpError.BadRequest('Missing required fields');
        }
        const isUserExist = await UserModel.findOne({username: username}).exec();

        if(!isUserExist)
            throw createHttpError(400, 'User not found');

        const result = await UserModel.deleteOne({username: username}).exec();
        console.log("User deleted from database successfully!");
        res.status(200).send(result);

    }
    catch{
        console.log("error in deleting a user");
        console.log(err);
        next(err);
    }
}
exports.login = async (req, res, next) => {
    console.log("Try to login a user");
    const username = req.body.username;
    const password = req.body.password;

    try{
        if(!username || !password){
            throw createHttpError.BadRequest('Missing required fields');
        }
        const user = await UserModel.findOne({username: username}).exec();

        if(!user){
            throw createHttpError(404, 'User not found');
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if(!isPasswordMatch){
            throw createHttpError.Unauthorized('Username/password not valid');
        }

        const accessToken = jwt.sign(
            {
                userId: user._id, 
                username: user.username,
            },
            process.env.JWT_TOKEN,            
            {expiresIn: '30d'}
            
        );
        user.token = accessToken;
        const result = await user.save();
        res.status(200).send(result);
            

        console.log("User logged in successfully!");
        res.status(200).send(user);
    }
    catch(err){
        console.log("error in login a user");
        console.log(err);
        next(err);
    }
}
exports.verifyToken = function (req, res, next) {
    res.status(200).send('valid');
}
