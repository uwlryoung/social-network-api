const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

//* Add any aggegate functions needed here: 
const userCount = async () => {
  const numberOfUsers = await User.aggregate()
    .count('userCount');
  return numberOfUsers;
};

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

      res.json(userObj);

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
      
      res.json({user});

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

  // PUT (update) a user by its _id
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
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  
  // DELETE (removes) a user by its _id
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }

      //! Need help working on this part: How to remove a thought once a user has been deleted
      //? BONUS: Remove a user's associated thoughts when deleted
      const thoughts = await Thought.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { thoughts }}, // thoughts isn't correct but putting in a placeholder
        { new: true }
      );
      //? Above is the BONUS and if it doesn't work this time, it's ok.

      res.json({ message: "User successfully deleted" });
    } catch (err){
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //* These are all for /api/:userId/friends/:friendId
  // POST (Create) Friend. Adds both users to each other's list immediately
  async addFriend(req, res) {
    try {
      if (req.params.userId === req.params.friendId) {
        return res.status(400).json({ message: "You cannot add a user as a friend to themself." });
      }

      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: req.params.friendId }}, 
        { runValidators: true, new: true }
      );

      const friend = await User.findOneAndUpdate(
        { _id: req.params.friendId},
        { $push: { friends: req.params.userId }},
        { runValidators: true, new: true}
      );

      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }

      if (!friend) {
        return res.status(404).json({ message: "No such fiend exists"})
      }
      
      res.json(user); 
      res.json(friend);
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