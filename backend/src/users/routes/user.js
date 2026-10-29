import express from 'express'
import {
    CreateUserController,
    DeactivateUserController,
    GetUserByEmailController,
    GetUserByIdController,
    UpdateUserController,
    AuthenticateUserController,
    ListUsersByCompanyIdController,
    ActivateUserController,
    ReauthenticateUserController,
} from '../controllers/index.js'
import { adminAuthMiddleware, authMiddleware } from '../../shared/middlewares/auth.js'

export const router = express.Router()

router.post('/create', authMiddleware, adminAuthMiddleware, async (req, res) => {
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

router.post(
    '/admin/validate-credentials',
    authMiddleware,
    adminAuthMiddleware,
    async (req, res) => {
        const reauthenticateUserController = new ReauthenticateUserController()

        const { statusCode, body } = await reauthenticateUserController.execute(req)

        res.status(statusCode).send(body)
    }
)

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

router.put('/admin/update/:userId', authMiddleware, adminAuthMiddleware, async (req, res) => {
    const updateUserController = new UpdateUserController()

    const { statusCode, body } = await updateUserController.execute(req)

    res.status(statusCode).send(body)
})

router.delete(
    '/admin/deactivate/:userId',
    authMiddleware,
    adminAuthMiddleware,
    async (req, res) => {
        const deactivateUserController = new DeactivateUserController()

        const { statusCode, body } = await deactivateUserController.execute(req)

        res.status(statusCode).send(body)
    }
)

router.put('/admin/activate/:userId', authMiddleware, adminAuthMiddleware, async (req, res) => {
    const activateUserController = new ActivateUserController()

    const { statusCode, body } = await activateUserController.execute(req)

    res.status(statusCode).send(body)
})

router.get('/:userId', async (req, res) => {
    const getUserByIdController = new GetUserByIdController()

    const { statusCode, body } = await getUserByIdController.execute(req)

    res.status(statusCode).send(body)
})
