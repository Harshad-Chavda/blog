const mongoose = require("mongoose")
const User = require("./user")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function seedData() {
    // Connection URL
    const uri = "mongodb://localhost:27017/blog";

    mongoose.set("strictQuery", false);
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Connected to db")
    }).catch((err) => {
        console.log("error", err)
    })

    let timeSeriesData = [{
        "email":"admin123@gmail.com",
        "password":"admin@123",
        "name":"Admin",
        "role":"user"
    }];

    const salt = await bcrypt.genSalt(10)
    timeSeriesData[0].password = await bcrypt.hash(timeSeriesData[0].password, salt)

    const seedDB = async () => {
        await User.insertMany(timeSeriesData)
    }

    seedDB().then(() => {
        mongoose.connection.close()
        console.log("seed success")
    })
}

seedData()