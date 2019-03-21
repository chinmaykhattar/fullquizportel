const express = require('express')
const router = express.Router();
const Users = require('./models/database.js').Users
const passport = require('../passport.js')
const nodemailer = require('nodemailer')
let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth:{
        user: 'chinmaykhattar1999@gmail.com',
        pass: 'Chinmay@1999'
    },
    tls:{
        rejectUnauthorised : false
    }
});
router.get('/login',(req,res)=>{
    res.render("login")
})
router.get('/register',(req,res)=>{
    res.render("register")
})
router.get('/forgot',(req,res)=>{
    res.render('forgot')
})
router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect: '/dashboard',
        failureRedirect : '/users/login',
        failureFlash:true
    })(req,res,next)
})

router.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success_msg','You are Logged Out')
    res.redirect('/users/login')
})
//registerhandledas
router.post('/register',(req,res)=>{
    const {name,email,mobile,password,password2} = req.body
    let errors =[]
    //check required field
    if(!name||!email||!password||!password2||!mobile)
    {
        errors.push({msg : 'Please fill in all fields'});
    }
    if(password !== password2)
    {
        errors.push({msg : 'Passwords do not match'})
    }
    if(password.length<6){
        errors.push({msg : 'Password should be at least 6 characters'})
    }
    if(errors.length>0){
        res.render('register',{
            errors,
            name,email,mobile,password,password2
        });

    }
    else{
         Users.findOne({
          where: {  username: email}
        }).then(user=>{
  
               if(user)
               {
                   errors.push({msg: 'Email is already registered'})
                //user exists
                res.render('register',{
                    errors,
                    name,email,mobile,password,password2
                });
            }
            else{
                Users.create({
                    name : name,
                    username: email,
                    number:mobile,
                    password : password
                 
                   
                }).then((createduser)=>{
                    req.flash('success_msg','You are now registered and can log in');
                    res.redirect('login')
                }).catch((err)=>{
                    console.log("Created User")
                })
            }
        });
        
    

        
           
        
        
    }

})

router.post('/forgot',(req,res)=>{
    let forgot = []
    if(!req.body.email)
    {
        forgot.push({msg: "please fill all the details"})
    }
    if(forgot.length>0){
        res.render('forgot',{
            forgot
        
    });
}
    else{

    Users.findOne({
        where:
         {
             username : req.body.email,}
    }).then(user=>{
          if(user)
          {
            let HelperOptions = {
                form: ' "Chinmay khattar" <chinmaykhattar1999@gmail.com>',
                to:  user.username,
                subject: 'Hello,World',
                html: `Your password is ${user.password}`
            };
            transporter.sendMail(HelperOptions,(error,info)=>{
                if(error){
                    return console.log(error);
                }
                req.flash('userfind','Your password will be sent to your email id')
                res.redirect('login')
                console.log("this message was sent")
                console.log(info);
            }
            )
              
         }
         else{
         forgot.push({msg: "User doesnot exist"})    
         res.render('forgot',{
             forgot
         })
        }
    })
    }
})
    
module.exports = router