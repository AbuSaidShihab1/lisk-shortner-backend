import mongoose from "mongoose";

const Url_schema=new mongoose.Schema({
    shorturl:String,
    originalurl:String,
    redirecturl:String,
    clicks:{
        type:Number,
        default:0
    },
});

const url_model=mongoose.model("Link",Url_schema);

export default url_model;