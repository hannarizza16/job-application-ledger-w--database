import User from "../models/User.js"

const getAllUser = async (req, res) => {
    try {
        
        const allUsers = await User.find({})
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(500).json({
            message: "Error Fetching users", error
        })
        
    }
}

const createUser = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const userEmail = await User.findOne({ email })

        if (userEmail) {
            res.status(400).send('User Email already registered')
            return
        }
        const newUser = new User({
            name, email, password
        })
        await newUser.save()

        res.status(201).json({
            message: 'User created successfully',
            user: newUser
        })
    } catch (error) {
        console.error(error)
        res.status(404).send('An error occured while creating the user')
    }
}

export {getAllUser, createUser}