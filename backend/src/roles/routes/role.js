import express from 'express'
import { CreateRoleController, GetRoleByIdController } from '../controllers/index.js'
import { UpdateRoleController } from '../controllers/updateRole.js'

export const router = express.Router()

router.post('/', async (req, res) => {
    const createRoleController = new CreateRoleController()

    const { statusCode, body } = await createRoleController.execute(req)

    res.status(statusCode).send(body)
})

router
    .route('/:roleId')
    .get(async (req, res) => {
        const getRoleByIdController = new GetRoleByIdController()

        const { statusCode, body } = await getRoleByIdController.execute(req)

        res.status(statusCode).send(body)
    })
    .put(async (req, res) => {
        const updateRoleController = new UpdateRoleController()

        const { statusCode, body } = await updateRoleController.execute(req)

        res.status(statusCode).send(body)
    })
