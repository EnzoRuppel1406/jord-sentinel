import express from 'express'
import {
    CreateRoleController,
    DeleteRoleController,
    GetRoleByIdController,
    GetRoleByNameController,
    ListRolesController,
    UpdateRoleController,
} from '../controllers/index.js'

export const router = express.Router()

router
    .route('/')
    .post(async (req, res) => {
        const createRoleController = new CreateRoleController()

        const { statusCode, body } = await createRoleController.execute(req)

        res.status(statusCode).send(body)
    })
    .get(async (req, res) => {
        const listRolesController = new ListRolesController()

        const { statusCode, body } = await listRolesController.execute()

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
    .delete(async (req, res) => {
        const deleteRoleController = new DeleteRoleController()

        const { statusCode, body } = await deleteRoleController.execute(req)

        res.status(statusCode).send(body)
    })

router.get('/name/:roleName', async (req, res) => {
    const getRoleByNameController = new GetRoleByNameController()

    const { statusCode, body } = await getRoleByNameController.execute(req)

    res.status(statusCode).send(body)
})
