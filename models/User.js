// const { ObjectId } = require('mongoose').Types;
const { Schema, model } = require('mongoose');
// const reactionSchema = require('./Reaction');
// const thoughtSchema = require('./Thought');

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
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'thought' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'user' }] 
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

userSchema.virtual('friendCount').get(function () {
  if (this.friends){
    return this.friends.length;
  } else {
    return 0;
  }
});

const User = model('user', userSchema);

module.exports = User; 