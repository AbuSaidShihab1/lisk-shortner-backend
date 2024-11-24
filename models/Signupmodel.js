import mongoose from "mongoose";

const Signup_Schema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
},{timestamps:true});

const Signup_model=mongoose.model("User",Signup_Schema);

export default Signup_model;