module.exports = {
    onlyUsers:function (req,res,next) {
        console.log("verify auth:",req.isAuthenticated())
        if(!req.isAuthenticated()){
            return res.redirect('/auth/login')
        }
        next()
    },
    onlyNotUsers:function (req,res,next) {
        if(req.isAuthenticated()){
            return res.redirect('/')
        }
        next()
    } 
}