import express from 'express'
import { CreateUserController } from '../controllers/index.js'

export const router = express.Router()

router.post('/', async (req, res) => {
    const createUserController = new CreateUserController()

    const { statusCode, body } = await createUserController.execute(req)

    res.status(statusCode).send(body)
})
