import mongoose, { Schema } from 'mongoose'


//create user model
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    isArchived: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model('User', userSchema)

export default User