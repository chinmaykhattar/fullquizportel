const squelize = require('sequelize')
const path = require('path')
const db = new squelize({
    dialect:'sqlite',
    storage: path.join(__dirname,'user3.db'),
    logging: true
})
const Users = db.define('users',{
   
    name: squelize.STRING,
    
    username: squelize.STRING,
    number: squelize.INTEGER,

    password: squelize.STRING,
    score : squelize.INTEGER
})
db.sync().then(()=>{
    console.log("Database has created")
})

module.exports = {
    db,Users
}