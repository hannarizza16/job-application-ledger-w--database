import mongoose from 'mongoose'; // import mongoose to connect to database

const connectionDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connected successfully')
        console.log('MONGO_URI:', process.env.MONGO_URI);

    } catch (error) {
        console.error('MongoDB connection error:', error)
        process.exit(1)
    }
}

export default connectionDB