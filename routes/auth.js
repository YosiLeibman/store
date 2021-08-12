const router = require('express').Router()
const path = require('path')
const { User } = require('../db/models')
const bcrypt = require('bcrypt')
const passport = require('passport')
const {onlyNotUsers, onlyUsers} = require('../helpers/verify')

 
router.get('/login', onlyNotUsers, (req,res)=>{
    res.sendFile(path.join(__dirname, '/../views/login.html'))
}) 

router.post('/login', passport.authenticate('local', {
    failureRedirect:"/auth/login",
    successRedirect:"/"
})) 

router.get('/register', onlyNotUsers, (req,res)=>{
    res.sendFile(path.join(__dirname, '/../views/register.html'))
})

router.post('/register', async (req,res)=>{
    console.log(req.body)
    try {
        const {username, password} = req.body
        if (username && password) {
            const hash = await bcrypt.hash(password, 10)
            const newUser = new User({username, password:hash})
            await newUser.save()
            return res.redirect('/auth/login')
        }
    } catch (err) {
        res.status(500)
        console.log(err)
    }
})

router.get('/logout', (req,res)=>{
    req.logOut()
    res.redirect('login')
})




module.exports = router