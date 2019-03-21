const express = require('express')
const app = express()
const session = require('express-session')
const passport = require('./passport')
const expresslayouts = require('express-ejs-layouts')
const flash = require('connect-flash')
const path = require('path')
const multer = require('multer')
const upload = multer({dest: 'New folder/'})
app.use(express.urlencoded({
    extended: true
  }))
  app.use(express.json())
  //app.use('/dashboard',express.static(path.join(__dirname,'public')))
  app.use(expresslayouts)
  app.use(express.static("New Folder"))
  app.set('view engine', 'ejs')
  app.use(session({
      secret : "somesecretstring",
      resave: true,
      saveUninitialized:false
  }))
 
  app.use(passport.initialize())
  app.use(passport.session())

  app.use(flash());
//global vars
app.use((req,res,next)=>{
    res.locals.success_msg1 = req.flash('success_msg1');
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.userfind = req.flash('userfind');
    next();
})
  
//router
const index = require("./routes/index.js")
const users = require("./routes/users.js")
app.use('/',index);
app.use('/users',users)
//app.use('/dashboard/test',express.static(path.join(__dirname,'public')))

app.listen(5005,()=>{
    console.log("Server started on port 5005")
})