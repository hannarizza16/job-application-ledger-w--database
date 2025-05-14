import mongoose, { Schema } from "mongoose";

const formSchema = new Schema({
    company: {
        type: String,
        required: true,
        trim: true,
    },
    position: {
        type: String, 
        required: true,
        trim: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['Applied', 'HR Interview', 'Technical Interview','Final Interview', 'Preparing', 'Rejected',  'Hired', 'Waiting' ]
    },
    date: {
        type: Date,
        default: Date.now 
    },
    note: {
        type: String,
        default: '',
        trim: true,
    },
    isArchived: {
        type: Boolean,
        default: false
    },
    // isDeleted: { // this is a good option for users information
    //     type: Boolean,
    //     default: false
    // }
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     // required: true
    // }

}) 
const Form = mongoose.model('Form', formSchema)

export default Form

// this gets date and timee.
//   date: {
//     type: Date,
//     default: Date.now 
//},