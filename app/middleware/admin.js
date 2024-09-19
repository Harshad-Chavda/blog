const jwt = require('jsonwebtoken')
const { Error } = require('mongoose')

const adminMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Authentication failed')
  }

  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
    throw new Error('Authentication failed')
    }
    req.user = {
      userId: decoded.userId,
      name: decoded.name,
      role:decoded.role
    }
    next()
  } catch (error) {
    throw new Error('Authentication failed')
  }
}

module.exports = adminMiddleware
