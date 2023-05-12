require('dotenv').config()

const express = require("express");
const app = express();
port = 3000;
messageServer = console.log("server working ...");
app.use(express.json());
// dataBase 
const connectDb = require("./db/connection");
connectDb();
// module
const indexRouter = require("./module/index.route");

app.use("/auth",indexRouter.authRouter);
app.use("/user",indexRouter.userRouter);
app.use("/movie",indexRouter.movieRouter);




app.get("*",(req,res)=>{
        res.json({msg:"page not found"});
})

app.listen(port,messageServer);
