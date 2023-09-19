const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const thoughtSchema = require('./Thought');
// const { reactionSchema, thoughtSchema} = require('../models');

//Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true // not in readme, but I think it's a good idea
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function(v){
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        }
      }
    },
    thoughts: [thoughtSchema],
    friends: [{type: Schema.Types.ObjectId, ref: 'friend' }]
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
})

const User = model('user', userSchema);

module.exports = User; 