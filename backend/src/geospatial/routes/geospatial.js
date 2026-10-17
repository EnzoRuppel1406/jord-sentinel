import express from 'express'
import { FindPropertyByCarCodeController } from '../controllers/index.js'

export const router = express.Router()

router.get('/:carCode', async (req, res) => {
    const findPropertyByCarCodeController = new FindPropertyByCarCodeController()

    const { statusCode, body } = await findPropertyByCarCodeController.execute(req)

    res.status(statusCode).send(body)
})
