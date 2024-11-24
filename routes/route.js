import express from "express"
import Signup_model from "../models/Signupmodel.js";
const route=express();
import bcrypt from "bcryptjs"

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

export default route;