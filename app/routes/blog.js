const express = require('express')
const router = express.Router()

const {
  getAllBlog,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blog')

router.route('/').get(getAllBlog).post(createBlog)
router.route('/:id').get(getBlog).put(updateBlog).delete(deleteBlog)

module.exports = router
