const express = require("express");

const app=express();
const PORT=3000;
app.use(express.json());


app.post('/signup',(req,res)=>{
    res.json({
        message: 'signup route',
    })
})
app.post('/signin',(req,res)=>{
    res.json({
        message: 'signin route',
    })
})
app.put('/update-user',(req,res)=>{
    res.json({
        message: 'update user detail route'
    })
})


app.listen((PORT),function(){
    console.log(`paytm app is listening on port number: ${PORT}`);
})