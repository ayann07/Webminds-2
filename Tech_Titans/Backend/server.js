require('dotenv').config();
const express=require('express');
const connectToDb=require('./db');
const bodyParser=require('body-parser');
const authRoute=require('./routes/auth-router')
const accountRoute=require('./routes/account-route')
const transactionRoute=require('./routes/transaction-route');
const webhookRoute=require('./routes/webHookRoute')
const cors=require("cors");

const app=express();
const PORT=process.env.PORT;
const corsOptions={
    origin:"*",
    method:"GET , POST , PUT , DELETE , PATCH , HEAD",
    credentials:true
}
app.use(cors(corsOptions));
app.use('/api/webhook', webhookRoute);
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/api/auth',authRoute);
app.use('/api/account',accountRoute);
app.use('/api/payments',transactionRoute);

connectToDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server Listening on : http://localhost:${PORT}`)
    })
})