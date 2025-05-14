import express from 'express'
import { getAllApplication, inputApplication, deleteApplication, archiveApplication, unarchiveApplication } from '../controller/formController.js'

const router = express.Router()


router.post('/create', inputApplication )

router.get('/all', getAllApplication )

router.delete('/:id', deleteApplication )

router.patch('/archive/:id', archiveApplication)

router.patch('/unarchive/:id', unarchiveApplication)

export default router
