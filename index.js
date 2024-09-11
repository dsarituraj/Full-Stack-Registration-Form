require('dotenv').config();
const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const app=express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended:true }));

mongoose.connect(process.env.MONGO);

const db=mongoose.connection;
db.on('error',()=> console.log("Error in Connecting to Database"));
db.once('open',()=> console.log("Connected to Database"));

app.post("/sign_up",async (req,res) => {
    const accounts = db.collection('accounts');
    const data={
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password
    };

    console.log("working");
    const exists = await accounts.findOne({email: data.email});
    if(exists) return res.redirect("./IfError.html")
    accounts.insertOne(data,(err,collection) => {
        if(err) throw err;
        console.log("Record Inserted Succesfully")
    });
    return res.redirect('./IfSuccess.html');
})

app.get("/",(req,res) => {
    res.set({ "Allow-acces-Allow-Origin":'*' });
    return res.redirect('./index.html');
}).listen(3000);

console.log("Listening on port 3000");