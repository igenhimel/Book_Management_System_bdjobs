require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session')

const app = express();
const PORT =process.env.PORT || 4000;

//database connection

//middleware

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(
    session({
        secret:"my secret key",
        saveUninitialized: true,
        resave:false
    })
);

app.use((req,res,next)=>{
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})




//set template engine

app.set('view engine','ejs');

//router prefix
app.use("",require("./routes/routes"));
app.use(express.static("uploads"))
mongoose.connect(`mongodb://127.0.0.1:27017/node_app`,{useNewUrlParser:true
})
.then(()=>{
        app.listen(PORT,(err)=>{
        console.log(`Server is Running on port ${PORT}`)
    })
})
.catch((e)=>{
    console.log(e)
})
