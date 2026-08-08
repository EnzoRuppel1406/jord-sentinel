import express from 'express'
import {
    CreateUserController,
    GetUserByEmailController,
    GetUserByIdController,
    UpdateUserController,
} from '../controllers/index.js'

export const router = express.Router()

router.post('/', async (req, res) => {
    const createUserController = new CreateUserController()

    const { statusCode, body } = await createUserController.execute(req)

    res.status(statusCode).send(body)
})

router
    .route('/:userId')
    .get(async (req, res) => {
        const getUserByIdController = new GetUserByIdController()

        const { statusCode, body } = await getUserByIdController.execute(req)

        res.status(statusCode).send(body)
    })
    .put(async (req, res) => {
        const updateUserController = new UpdateUserController()

        const { statusCode, body } = await updateUserController.execute(req)

        res.status(statusCode).send(body)
    })

router.get('/email/:userEmail', async (req, res) => {
    const getUserByEmailController = new GetUserByEmailController()

    const { statusCode, body } = await getUserByEmailController.execute(req)

    res.status(statusCode).send(body)
})
