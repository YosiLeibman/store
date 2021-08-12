const router = require('express').Router()
const { User, Product } = require('../db/models')
const {onlyNotUsers, onlyUsers} = require('../helpers/verify')


router.get('/', onlyUsers, async (req,res)=>{
    try {
        res.json(await Product.find())
    } catch (error) {
        res.sendStatus(500)
    }
})

router.get('/cart', onlyUsers, async (req,res)=>{
    try {
        const user = await User.findById(req.user._id).populate('cart._id')
        res.send(user.cart)
    } catch (error) {
        res.sendStatus(500)
        console.log(error)
    }
})


router.post('/addtocart', onlyUsers, async (req,res)=>{
    try {
        console.log(req.body)
        if(req.body.id){
            const user = await User.findById(req.user._id).populate('cart._id')
            const prod = user.cart.find(item=>item._id._id == req.body.id )
            const index = user.cart.findIndex(item=>item._id._id ==req.body.id )
            console.log(user, index)
            console.log(prod)
            if(!prod){
                await User.findByIdAndUpdate(req.user._id, {
                    $push:{
                        cart:{_id:req.body.id , amount:1}
                    }
                })
            }else{
                await User.update(
                    { "_id" : req.user._id, "cart._id": prod._id._id }, 
                    { "$set": { "cart.$.amount": prod.amount + 1}}
                )
            }
            res.sendStatus(201)
        }else{
            res.sendStatus(400)
        }
    } catch (err) {
        res.sendStatus(500)
        console.log(err)
    }
})


module.exports = router