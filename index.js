const express = require("express");
const db =require("./database/db");
const dotenv=require('dotenv');

const userRouter = require('./routes/userRoute')
const noteRouter = require('./routes/noteRoute')

const app = express();
dotenv.config();
const cors = require("cors");
app.use(cors());

app.use(express.urlencoded({extended:true}));
app.use(express.json({limit:"10mb"}));


app.use("/user",userRouter);
app.use("/note",noteRouter);


app.get("/", (req,res)=>{
    res.send("api is working")
})

app.listen(5000, async()=>{
    await db()
    console.log("server is at 5000")
})