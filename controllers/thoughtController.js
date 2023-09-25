const { User, Thought } = require('../models');

module.exports = {
  //* The following fuctions use the routes /api/thoughts
  // Gets all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find().select('-__v');
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Creates a new thought 
  async createThought(req, res) {
    try {
      const user = await User.findOne(
        { _id: req.body.userId, username: req.body.username },
      )
      if(!user){
        return res.json({ message: "User not found!"})
      }
      
      const thought = await Thought.create(req.body);
      user.thoughts.push(thought._id);
      user.save();
  
      res.json({user, thought});
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //* The following fuctions use the routes /api/thoughts/:thoughtId
  // Gets a single thought by its _id
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v');

      if (!thought) {
        return res.status(404)({ message: "That thought doesn't exist"})
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

// Updates a thought by its _id
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId},
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought){
        res.status(404).json({ message: "Thought doesn't exist with that ID"})
      }
      res.json(thought);

    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

// Deletes a thought by its _id
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId })

      if (!thought) {
        res.status(404).json({ message: "No Thought found with that ID"})
      }

      res.json({ message: "Thought deleted!" });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err)
    }
  },


//* The following fuctions use the routes /api/thoughts/:thoughtId/reactions
// Creates a reaction to single thought
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body }},
        { runValidators: true, new: true }
      );
      
      if (!thought) {
        return res.status(404).json({ message: "No thought found with that ID"})
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

// Deletes a thought's reaction by reactionId
  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.body.reactionId }}},
        { runValidators: true, new: true }
      );

      if (!thought){
        return res.status(404).json({ message: "No thought found with that ID" });
      }

      res.json({ message: "Reaction Successfully removed from thought", thought });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};