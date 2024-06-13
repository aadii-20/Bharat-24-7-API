// main.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const connectDB = require('./db/connect');

const PORT = process.env.PORT || 3000;
const databaseRoutes = require('./routes/route'); // Correct path

app.get("/",(req,res)=>{
    res.send("Aadi API is live");
});

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS middleware
app.use(cors());

app.use('/api/database', databaseRoutes); 

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        console.log("Connected to DB");
        app.listen(PORT, ()=>{
            console.log(`${PORT} Yes I am Connected`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
