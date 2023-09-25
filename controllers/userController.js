const { User, Thought } = require('../models');

//* Add any aggegate functions needed here: 
const userCount = async () => {
  const numberOfUsers = await User.aggregate()
    .count('userCount');
  return numberOfUsers;
};

module.exports = {
  //* The following fuctions use the routes /api/users/
  // Gets all Users; Route: api/users
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

  // Creates a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err){
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //* The following fuctions use the routes /api/users/:userID
  // Gets a single user by its _id and populates thought and friend data
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

  // Updates a user's username and email
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

  // Deletes a user by its _id and removes any associated thoughts
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }

      const thoughts = await Thought.deleteMany(
        { username: user.username },
        { new: true }
      );

      res.json({ message: "User successfully deleted and associated thoughts (if any)" });
    } catch (err){
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //* The following fuctions use the routes /api/users/:userId/friends/:friendId
  // Adds two users as friends
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
      };

      if (!friend) {
        return res.status(404).json({ message: "No such fiend exists"})
      };
      
      res.json({user, friend}); 
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Removes friends from each others' friend list
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId}},
        { runValidators: true, new: true}
      );

      const friend = await User.findOneAndUpdate(
        { _id: req.params.friendId},
        { $pull: { friends: req.params.userId }},
        { runValidators: true, new: true}
      );

      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      };

      if (!friend) {
        return res.status(404).json({ message: "No such fiend exists"})
      };

      res.json({ message: "Users successfully removed from each other's friend lists."});
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
};