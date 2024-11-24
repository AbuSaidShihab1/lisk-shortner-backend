import express from "express"
import Signup_model from "../models/Signupmodel.js";
const route=express();
import bcrypt from "bcryptjs"
import { nanoid } from 'nanoid'
import url_model from "../models/Urlmodel.js";
route.post("/signup",async(req,res)=>{
    try {
         const {name,email,password}=req.body;
         const find_user=await Signup_model.findOne({email:email});
         if(find_user){
            res.send({success:false,message:"User already exist!"});
         }
         const hash_password=await bcrypt.hash(password,10);
         const create_user=new Signup_model({
            name,email,password:hash_password
         });
         if(create_user){
            create_user.save();
            res.send({success:true,message:"Registration Successful!"})
         }
    } catch (error) {
        console.log(error)
    }
});

route.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body;
        const find_email=await Signup_model.findOne({email:email});
        if(find_email){
            const compare_password=await bcrypt.compare(password,find_email.password);
            if(compare_password){
                         res.send({success:true,message:"Login successful!",user_info:find_email})
            }else{
            res.send({success:false,message:"Email and Password did not match!"})
            }
        }
            res.send({success:false,message:"Email and Password did not match!"})
    } catch (error) {
        console.log(error)
    }
})
// link shortner
route.post("/url-shorten",(req,res)=>{
    try {
         const {originalurl}=req.body;
         const shorturl=nanoid(8);
         const url_create=new url_model({
            shorturl,originalurl,redirecturl:"https://uknews.top/",
         });
         if(url_create){
            url_create.save();
            res.send({success:true,message:"ok",data:url_create})
         }
    } catch (error) {
        console.log(error)
    }
});
route.get("/url-shorten/:shortid",async(req,res)=>{
    try {
         const match_url=await url_model.findOne({shorturl:req.params.shortid});
         if(match_url){
            match_url.clicks++;
            match_url.save();
            res.send({success:true,message:"ok",data:match_url})

         } 

    } catch (error) {
        console.log(error)
    }
})
export default route;