// myDB.js
require("dotenv").config();
const connectDB = require("./db/connect");

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        console.log("success")
        
    } catch (error) {
        console.log(error);
    }
};

start();
