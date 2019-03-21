const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const {
  Users
} = require('./routes/models/database.js')


passport.use(new LocalStrategy({usernameField:'email'},function(email,password,done){

    Users.findOne({
        where:{
            username:email,
           // password:req.body.password
        }
    }).then((user)=>{
        if(!user)
        {
           return done(null,false,{message: "No such user"})
        }
        if(user.password !== password)
        {
            return done(null,false,{message:"wrong password"})
        }
        return done(null,user)
    }).catch((err=>{
        console.log('error')
    }))
}

))

passport.serializeUser(
  (user, done) => {
    done(null,user.username)
  }
)


passport.deserializeUser(
  (email, done) => {
    Users.findOne({
      where: {username: email}
    })
    .then((user) => {
        if(!user){
            return done(new Error("No such user"))
        }
       return done(null,user)
  }
).catch((err)=>{
   done(err)
})
})

module.exports = passport