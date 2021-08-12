const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const productSchema = new mongoose.Schema({
	name: String,
	price: Number,
})

const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	cart: [
		{
			amount: Number,
			_id: {
				type: mongoose.SchemaTypes.ObjectId,
				ref: 'Product',
			},
		},
	],
})

userSchema.methods.validPassword = async function (password) {
	try {
		const valid = await bcrypt.compare(password, this.password)
		console.log(valid)
		return valid
	} catch (error) {
		return error
	}
}

const Product = mongoose.model('Product', productSchema)
const User = mongoose.model('User', userSchema)

module.exports = {
	Product,
	User,
}
