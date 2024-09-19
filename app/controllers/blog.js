const Blog = require('../model/blog')
const { StatusCodes } = require('http-status-codes')

const getAllBlog = async (req, res) => {
  const Blogs = await Blog.find().sort('-createdAt')
  res.status(StatusCodes.OK).json({ Blogs, count: Blogs.length })
}

const getBlog = async (req, res) => {
  const {
    user: { userId },
    params: { id: BlogId }
  } = req
  const Blog = await Blog.findOne({ _id: BlogId, createdBy: userId })
  if (!Blog) {
    return res.status(StatusCodes.OK)
    .json({ message: `No User found with id: ${BlogId}.`,code: StatusCodes.BAD_REQUEST})
  }
  res.status(StatusCodes.OK).json(Blog)
}

const createBlog = async (req, res) => {
  req.body.createdBy = req.user.userId
  const Blog = await Blog.create(req.body)
  res.status(StatusCodes.CREATED).json(Blog)
}

const updateBlog = async (req, res) => {
  const {
    user: { userId },
    params: { id: BlogId },
  } = req
 
  const Blog = await Blog.findByIdAndUpdate(
    { _id: BlogId, createdBy: userId },
    req.body,
    {
      new: true,
      runValidators: true
    }
  )
  if (!Blog) {
    return res.status(StatusCodes.OK)
    .json({ message: `No User found with id: ${BlogId}.`,code: StatusCodes.BAD_REQUEST})
  }
  res.status(StatusCodes.OK).json(Blog)
}

const deleteBlog = async (req, res) => {
  const {
    user: { userId },
    params: { id: BlogId }
  } = req
  const Blog = await Blog.findByIdAndRemove({ _id: BlogId, createdBy: userId })
  if (!Blog) {
    return res.status(StatusCodes.OK)
    .json({ message: `No User found with id: ${BlogId}.`,code: StatusCodes.BAD_REQUEST})
  }
  res.status(StatusCodes.OK).send()
}

module.exports = {
  getAllBlog,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog
}
