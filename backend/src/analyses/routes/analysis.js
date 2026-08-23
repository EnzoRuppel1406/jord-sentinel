import express from 'express'
import { authMiddleware } from '../../shared/middlewares/auth.js'
import {
    CreateAnalysisController,
    ListAnalysesByCompanyIdController,
} from '../controllers/index.js'

export const router = express.Router()

router.post('/', authMiddleware, async (req, res) => {
    const createAnalysisController = new CreateAnalysisController()

    const { statusCode, body } = await createAnalysisController.execute(req, req.user)

    res.status(statusCode).send(body)
})

router.get('/list', authMiddleware, async (req, res) => {
    const listAnalysesByCompanyIdController = new ListAnalysesByCompanyIdController()

    const { statusCode, body } = await listAnalysesByCompanyIdController.execute(req.user)

    res.status(statusCode).send(body)
})
