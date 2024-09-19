const express = require('express')
const router = express.Router()

const {
  getAllUser,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/user')

router
  .route('/')
  .get(getAllUser)
  .post(createUser)
router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser)

module.exports = router
