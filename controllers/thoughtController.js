const { User, Thought } = require('../models');

//* These are for /api/thoughts

//TODO: GET all thoughts

//TODO: GET a single thought by its _id

//TODO: POST (create) a new thought 
// ! Don't forget to push the created thoughts _id to the associated user's thoughts array field
//* Example Data: 
  //* {
  //*   "thoughtText": "Here's a cool thought...",
  //*   "username": "lernantino",
  //*   "userId": "5edff358a0fcb779aa7b118b"
  //* }

//TODO: PUT (update) a thought by its _id

//TODO: DELETE (remove) a thought by its _id

//* These are for /api/thoughts/:thoughId/reactions
//TODO: POST a create reactiton stored in a single thought's reaching array field

//TODO: DELETE to pull and remove a reaction by the reaction's reactionId value