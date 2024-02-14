const Router = require('express')
const mongoose = require('mongoose')

const router = Router();

mongoose.connect('mongodb://127.0.0.1:27017/trade')
    .then(() => {
        console.log("Connected to database successfully")
    })
    .catch((error) => {
        console.log(`Error ${error}`)
    })

const UserSchema = new mongoose.Schema({
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true
    }
})

module.exports = router;
module.exports = mongoose.model('users', UserSchema)