import express from 'express'
import { getAllUser, createUser } from '../controller/userController.js'

const router = express.Router()

// crud get

router.get('/all', getAllUser)

router.post('/create', createUser)



export default router