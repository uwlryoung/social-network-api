const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

//* Add any aggegate functions needed here: 
const userCount = async () => {
  const numberOfUsers = await User.aggregate()
    .count('userCount');
  return numberOfUsers;
};

// const friendCount = async (userId) => {
//   User.aggregate([
//     { $match: {_id: new ObjectId(userId)}}

//   ])
// }

// Below won't be necessary with .populate()
// const friendList = async (userId) => {
//   User.aggregate([
//     { $match: {_id: new ObjectId(userId)}},
//     { $unwind: '$friends'},
//     {
//       $group: {
//         _id: new ObjectId(userId),
//         friends: friends,
//       },
//     },
//   ]);
// };


// * These are all for /api/users
// TODO: GET All Users

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find()
        .populate({ path: 'friends', select: '-__v' })
        .populate({ path: 'thoughts', select: '-__v' });

      const userObj = {
        users,
        userCount: await userCount(),
      };

      res.JSON(userObj);

    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },


  // TODO: GET a single user by its _id and populate thought and friend data

  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({_id: req.params.userId})
        .populate({ path: 'friends', select: '-__v' })
        .populate({ path: 'thoughts', select: '-__v' });
      
      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }
      
      res.json({
        user
        // friends: await friends(req.params.userId), // Not Necessary because we are populating it
        // Add thoughts as well
      });

    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // TODO: POST (create) a new user Example: 
    //* {
    //*   "username": "lernantino",
    //*   "email": "lernantino@gmail.com"
    //* }

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err){
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // TODO: PUT (update) a user by its _id
  // What exactly should we update here? 
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        {
          username: req.body.username,
          email: req.body.email
        },
        { new: true }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  };

  
  // TODO: DELETE (remove) a user by its _id
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }

      res.json({ message: "User successfully deleted" });
    } catch (err){
      console.log(err);
      return res.status(500).json(err);
    }
  },


  //? BONUS: Remove a user's associated thoughts when deleted

  //* These are all for /api/:userId/friends/:friendId

  // TODO: POST (create) to add a new friend to a user's friend list

  async addFriend(req, res) {
    console.log("You are adding a friend");
    console.log(req.body);

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.body }}, 
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }
      
      res.json(user); 
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // TODO: DELETE (remove) a friend from a user's friend list

  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: { friendId: req.params.friendId }}},
        { runValidators: true, new: true}
      );

      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      };

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
};