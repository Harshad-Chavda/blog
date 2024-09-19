const User = require('../model/user')
const { StatusCodes } = require('http-status-codes')

const getAllUser = async (req, res) => {
  const Users = await User.find().sort('-createdAt')
  res.status(StatusCodes.OK).json({ Users, count: Users.length })
}

const getUser = async (req, res) => {
  const { params: { id: UserId }} = req;

  const User = await User.findOne({ _id: UserId })
  if (!User) {
    return res.status(StatusCodes.OK)
    .json({ message: `No User found with id: ${UserId}.`,code: StatusCodes.BAD_REQUEST})
  }
  res.status(StatusCodes.OK).json(User)
}

const createUser = async (req, res) => {
    const user = await User.create({ ...req.body })
    const token = user.createJwt()
    return res
      .status(StatusCodes.CREATED)
      .json({ user: { id: user._id, name: user.name }})
}

const updateUser = async (req, res) => {
  const {
    params: { id: UserId },
    body: { email, name,password,role }
  } = req
  
  const User = await User.findByIdAndUpdate(
    { _id: UserId },
    req.body,
    {
      new: true,
      runValidators: true
    }
  )
  if (!User) {
    return res.status(StatusCodes.OK)
    .json({ message: `No User found with id: ${UserId}.`,code: StatusCodes.BAD_REQUEST})
  }
  res.status(StatusCodes.OK).json(User)
}

const deleteUser = async (req, res) => {
  const {
    params: { id: UserId }
  } = req
  const User = await User.findByIdAndRemove({ _id: UserId, createdBy: userId })
  if (!User) {
    return res.status(StatusCodes.OK)
    .json({ message: `No User found with id: ${UserId}.`,code: StatusCodes.BAD_REQUEST})
  }
  res.status(StatusCodes.OK).send()
}

module.exports = {
  getAllUser,
  getUser,
  createUser,
  updateUser,
  deleteUser
}
