const { User, Thought } = require('../models');

//* These are for /api/thoughts

module.exports = {
//TODO: GET all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

//TODO: GET a single thought by its _id

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');
    

      if (!thought) {
        return res.status(404)({ message: "That thought doesn't exist"})
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

//TODO: POST (create) a new thought 
// ! Don't forget to push the created thoughts _id to the associated user's thoughts array field
//* Example Data: 
  //* {
  //*   "thoughtText": "Here's a cool thought...",
  //*   "username": "lernantino",
  //*   "userId": "5edff358a0fcb779aa7b118b"
  //* }

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId},
        { $push: {thoughts: thought}},
        { runValidators: true, new: true }
      );
      res.json(course);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

//TODO: PUT (update) a thought by its _id

  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId},
        { $set: req.body },
        { runValidators: true, new: true }
      );

      // Maybe I don't need this? I think new: true above makes it so that 
      // if it doesn't exist, it will add it as a new thought. 
      if (!thought){
        res.status(404).json({ message: "Thought doesn't exist with that ID"})
      }
      res.json(thought);

    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

//TODO: DELETE (remove) a thought by its _id
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


//* These are for /api/thoughts/:thoughtId/reactions
//TODO: POST a create reaction stored in a single thought's reaching array field
  async createReaction(req, res) {
    console.log("You are adding a reaction");
    console.log(req.body);
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body }}, // maybe this should be $push?
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

//TODO: DELETE to pull and remove a reaction by the reaction's reactionId value

  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionid }}},
        { runValidators: true, new: true}
      );

      if (!thought){
        return res.status(404).json({ message: "No thought found with that ID"});
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};