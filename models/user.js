const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const crypto = require("crypto")
const { string } = require('joi');

// const Token = require('./token');


const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    minlength: 3,
    maxlength: 50,
  },
  lastname: {
    type: String,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    minlength: 3,
  },
 
}, {timestamps:true})

UserSchema.pre('save', async function () {
  // console.log(this.modifiedPaths());
  // console.log(this.isModified('name'));
  if (!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password)
  return isMatch
}

UserSchema.methods.generateVerificationToken = function() {
  let payload = {
      userId: this._id,
      token: crypto.randomBytes(64).toString("hex")
  };

  return new Token(payload);
};



module.exports = mongoose.model('User', UserSchema)
