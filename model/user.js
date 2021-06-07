const { Schema, model } = require('mongoose')
const Subscription=require('../helpers/constants')
const bcrypt=require('bcryptjs')
const SALT_FAKTOR=8

const userSchema = new Schema(
    {
        password: {
          type: String,
          required: [true, 'Password is required'],
        },
        email: {
          type: String,
          required: [true, 'Email is required'],
          unique: true,
         
        },
        subscription: {
          type: String,
          enum: [Subscription.STARTER, Subscription.PRO, Subscription.BUSSINES],
          default: Subscription.STARTER
        },
        token: {
          type: String,
          default: null,
        },

       
      }
)

userSchema.pre('save', async function(next){
  if(this.isModified('password')){
    const salt= await bcrypt.genSalt(SALT_FAKTOR)
    this.password =await bcrypt.hash(this.password, salt)
  }
  next()
})

userSchema.methods.isValidPassword= async function(password){
  return await bcrypt.compare(password, this.password)
}


const User = model('user', userSchema)

module.exports = User
