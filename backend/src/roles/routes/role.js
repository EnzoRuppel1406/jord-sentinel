import express from 'express'
import { CreateRoleController } from '../controllers/createRole.js'

export const router = express.Router()

router.post('/', async (req, res) => {
    const createRoleController = new CreateRoleController()

    const { statusCode, body } = await createRoleController.execute(req)

    res.status(statusCode).send(body)
})
