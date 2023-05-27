// require("dotenv").config();
import mongoose from "mongoose";
const url: string = process.env.MONGODB_URI || "";

mongoose.connect(url)
.then(()=>{
    console.log("MongoDB connected");
})
.catch((error:any)=>{
    console.log("🚀 ~ Error while connecting to MongoDB - file: db.ts:14 ~ error:", error);
})

export = mongoose;