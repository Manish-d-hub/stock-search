import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import validator from 'validator';

import db from '../../connection/dbConnection.js';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      validate: [validator.isEmail, 'Please provide an valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        // this only works on SAVE and CREATE!!
        validator: function (el) {
          return el === this.password; // here "el" is passwordConfirm
        },
        message: "Passwords didn't match",
      },
    },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    active: { type: Boolean, default: true, select: false },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  // function is executed only when password is created or modified
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 13);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  givenPassword,
  userPassword
) {
  return await bcrypt.compare(givenPassword, userPassword);
};

const User = db.model('User', userSchema);

export default User;
