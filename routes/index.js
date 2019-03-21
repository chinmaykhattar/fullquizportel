const express = require('express')
const router = express.Router()
const path = require('path')
const Users = require('./models/database1.js').Users
const passport = require('../passport.js')
const app = express()
const {ensureAuthenticated} = require('../oneauth.js')


router.get('/',(req,res)=>{
    res.render("welcome")
})
router.get('/dashboard',ensureAuthenticated,(req,res)=>{
    res.render('dashboard',{
        name : req.user.name
    })
})
router.use('/dashboard/test',ensureAuthenticated,express.static(path.join(__dirname,'public1')))
router.get('/submit',ensureAuthenticated,(req,res)=>{
     res.sendFile(path.join(__dirname,'../thanks.html'))
     req.logout();
    req.flash('success_msg1','Your score has been submitted')
    res.redirect('/users/login')
})
/*router.get('/submit',(req,res)=>{
    //res.sendFile(path.join(__dirname,'../thanks.html'))
    req.logout();
    req.flash('success_msg1','Your score has been submitted')
    res.redirect('/users/login')
    
})*/
router.post('/submit',ensureAuthenticated,(req,res)=>{
    
    //check required field
                  Users.create({
                      username: req.user.username,//sir yha pe galti aa rhi haigit 
                      score : req.body.result
                  }).then((createdUser)=>{
                      console.log('SUCCESSFULL')
                  }).catch((err)=>{
                      console.log('NOT SUCCESSFULL')
                  })
                
})
module.exports = router
