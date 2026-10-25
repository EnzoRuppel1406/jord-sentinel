import express from 'express'
import {
    CreateUserController,
    DeleteUserController,
    GetUserByEmailController,
    GetUserByIdController,
    UpdateUserController,
    AuthenticateUserController,
    ListUsersByCompanyIdController,
} from '../controllers/index.js'
import { adminAuthMiddleware, authMiddleware } from '../../shared/middlewares/auth.js'

export const router = express.Router()

router.post('/create', async (req, res) => {
    const createUserController = new CreateUserController()

    const { statusCode, body } = await createUserController.execute(req)

    res.status(statusCode).send(body)
})

router.post('/login', async (req, res) => {
    const authenticateUserController = new AuthenticateUserController()

    const { statusCode, body, cookie } = await authenticateUserController.execute(req)

    if (cookie) {
        const { name, value, options } = cookie

        res.cookie(name, value, options)
    }

    res.status(statusCode).send(body)
})

router.get('/me', authMiddleware, async (req, res) => {
    res.send({
        userId: req.user.sub,
        name: req.user.name,
        email: req.user.email,
        companyId: req.user.companyId,
        roleId: req.user.roleId,
        isAdmin: req.user.isAdmin,
    })
})

router.get('/email/:userEmail', async (req, res) => {
    const getUserByEmailController = new GetUserByEmailController()

    const { statusCode, body } = await getUserByEmailController.execute(req)

    res.status(statusCode).send(body)
})

router.get('/admin/listUsers', authMiddleware, adminAuthMiddleware, async (req, res) => {
    const listUsersByCompanyId = new ListUsersByCompanyIdController()

    const { statusCode, body } = await listUsersByCompanyId.execute(req.user)

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
    .delete(async (req, res) => {
        const deleteUserController = new DeleteUserController()

        const { statusCode, body } = await deleteUserController.execute(req)

        res.status(statusCode).send(body)
    })
