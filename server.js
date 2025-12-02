/*import dotenv from 'dotenv';
import mongoose from 'mongoose'
import express from "express";
import userRoute from "./route/user.js"
//const { default: mongoose } = require('mongoose');

const server = express()
server.use(express.json());
dotenv.config()
server.listen(5000,()=>{
  console.log(`server is running in port${process.env.PORT}`)
})
//Routes
server.use('api/users',userRoute)

console.log("my Name is OCJ")

//server.get('/',(req,res)=>{
  //res.send('Hello world')
//})
mongoose.connect(process.env.MONGO_URL).then(()=>{
  console.log("connection successful")
}).catch(()=>{
  console.log('not connected')
})*/

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from "express";
import cors from "cors";
import userRoute from "./route/user.js";

dotenv.config();

const server = express();

// FIX: Enable CORS
server.use(cors({
  origin: "http://localhost:5000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

server.use(express.json());

// Routes
server.use('/api/users', userRoute);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("connection successful"))
  .catch((err) => console.log("not connected", err));

// Start server
server.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
