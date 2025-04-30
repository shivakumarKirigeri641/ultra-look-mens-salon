const express = require('express');
const cors = require('cors');
const cookieParser=require('cookie-parser');
const connectDB = require('./database/connectDB');
const app = new express();
const ServicesList=require('./models/servicesList');
const authRouter = require('./routers/authRouter');
const servicesRouter = require('./routers/servicesRouter');


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:1234',
    credentials: true
}));
app.use('/', authRouter);
app.use('/', servicesRouter);
connectDB().then(()=>{
    console.log('Database connected successfully.');
    app.listen(7777, ()=>{
        console.log('Server is now listening');
    });
});
