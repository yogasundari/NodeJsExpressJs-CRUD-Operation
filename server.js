const express=require('express');
const dotenv=require('dotenv');
const routes=require('./routes/user');
dotenv.config();
const app=express();
const PORT=process.env.PORT ||5000;
app.use('/user',routes);

app.use(express.json());
app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`)); 