module.exports = async function () {
    try {
        await require('mongoose').connect('mongodb://localhost/store', {
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log("connected to mongo store db")
    } catch (err) {
        console.log(err)
    }
}