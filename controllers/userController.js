const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// * These are all for /api/users
// TODO: GET All Users

// TODO: GET a single user by its _id and populate thought and friend data

// TODO: POST (create) a new user Example: 
  //* {
  //*   "username": "lernantino",
  //*   "email": "lernantino@gmail.com"
  //* }

// TODO: PUT (update) a user by its _id

// TODO: DELETE (remove) a user by its _id

//? BONUS: Remove a user's associated thoughts when deleted

//* These are all for /api/:uswerId/friends/:friendId

// TODO: POST (create) to add a new firend to a user's friend list

// TODO: DELETE (remove) a friend from a user's friend list