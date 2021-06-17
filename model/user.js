const { Schema, model } = require('mongoose')
const {Subscription}=require('../helpers/constants')
const gr = require('gravatar')
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
        avatarURL: {
          type: String,
          default: function () {
            return gr.url(this.email, { s: '250' }, true)
          }},
        token: {
          type: String,
          default: null,
        },
        {
          verify: {
            type: Boolean,
            default: false,
          },
          verifyToken: {
            type: String,
            required: [true, 'Verify token is required'],
          },
        }

       
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
