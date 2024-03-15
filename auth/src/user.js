const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
username: {
    type: String,
    required: true,
    unique: true
},
usertype : {
    type : String,
    required : true
},
password: {
    type: String,
    required: true
},
token : {
    type : String,
    required : false
}
});




module.exports = mongoose.model('User', UserSchema);




