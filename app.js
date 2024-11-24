import express from "express"
const app=express();
const port=process.env.port || 4000;
import cors from "cors"
import route from "./routes/route.js";
import database from "./config/database.js"

app.use(express.json());
app.use(cors());
app.use(route)
database();
app.get("/",(req,res)=>{
    try {
         res.send("Hello shiha")
    } catch (error) {
        console.log(error)
    }
});

app.listen(port,()=>{
    console.log(`Your server is running on ${port}`)
})