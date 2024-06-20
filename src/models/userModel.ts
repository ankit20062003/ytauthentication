import mogoose from 'mongoose'

const userSchema = new mogoose.Schema({
    name : {type :String , required :true },
    email : {type : String , required : true},
    password : {type : String , select : false},
    googleId :{type : String},

});

export const User = mogoose.models ?.User || mogoose.model("User", userSchema);