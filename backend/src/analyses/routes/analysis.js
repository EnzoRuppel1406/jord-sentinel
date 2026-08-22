import express from 'express'
import { authMiddleware } from '../../shared/middlewares/auth.js'
import { CreateAnalysisController } from '../controllers/index.js'

export const router = express.Router()

router.post('/', authMiddleware, async (req, res) => {
    const createAnalysisController = new CreateAnalysisController()

    const { statusCode, body } = await createAnalysisController.execute(req, req.user)

    res.status(statusCode).send(body)
})
