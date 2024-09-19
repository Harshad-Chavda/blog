const User = require('../model/user')
const { StatusCodes } = require('http-status-codes')

const register = async (req, res) => {
  const user = await User.create({ ...req.body })
  const token = user.createJwt()
  return res
    .status(StatusCodes.CREATED)
    .json({ user: { id: user._id, name: user.name }})
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
     return res.status(StatusCodes.OK)
    .json({ message: 'Please provide email and password.',code: StatusCodes.BAD_REQUEST})
  }
  const user = await User.findOne({ email })
  if (!user) {
    return res
    .status(StatusCodes.OK)
    .json({ message: 'You are not registered with us. Please sign up.',code: StatusCodes.NOT_FOUND})
  }

  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    return  res
    .status(StatusCodes.OK)
    .json({ message: 'You are not registered with us. Please sign up.',code: StatusCodes.NOT_FOUND})
  }

  const token = user.createJwt()
  return res
    .status(StatusCodes.OK)
    .json({ user: { id: user._id, name: user.name }, token })
}

module.exports = {
  register,
  login
}
