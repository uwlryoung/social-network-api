const router = require('express').Router();
// Add destructured functions here once you have them, between { }
const { 
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;