import express from 'express'
import { authMiddleware } from '../../shared/middlewares/auth.js'
import {
    CreateAnalysisController,
    ListAnalysesByCompanyIdController,
    SummarizeAnalysesByCompanyIdController,
} from '../controllers/index.js'

export const router = express.Router()

router.post('/create', authMiddleware, async (req, res) => {
    const createAnalysisController = new CreateAnalysisController()

    const { statusCode, body } = await createAnalysisController.execute(req, req.user)

    res.status(statusCode).send(body)
})

router.get('/list', authMiddleware, async (req, res) => {
    const listAnalysesByCompanyIdController = new ListAnalysesByCompanyIdController()

    const { statusCode, body } = await listAnalysesByCompanyIdController.execute(req.user)

    res.status(statusCode).send(body)
})

router.get('/summary', authMiddleware, async (req, res) => {
    const summarizeAnalysesByCompanyIdController = new SummarizeAnalysesByCompanyIdController()

    const { statusCode, body } = await summarizeAnalysesByCompanyIdController.execute(req.user)

    res.status(statusCode).send(body)
})
