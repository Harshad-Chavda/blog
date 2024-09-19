require('dotenv').config()
const express = require('express')
const app = express()

const cors = require('cors');

// connectDB
const connectDB = require('./app/db/connect')

const authenticationMiddleware = require('./app/middleware/authentication')
const adminMiddleware = require('./app/middleware/admin')

// routers
const authRouter = require('./app/routes/auth')
const userRouter = require('./app/routes/user')
const blogRouter = require('./app/routes/blog')


app.use(cors())
app.use(express.json())

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user',adminMiddleware, userRouter)
app.use('/api/v1/blog',authenticationMiddleware, blogRouter)

app.get("/", (req, res) => {
    res.json({ message: "Welcome to blog application." });
  });
  

const port = process.env.PORT || 5001

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => console.log(`Server is listening on PORT: ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()
