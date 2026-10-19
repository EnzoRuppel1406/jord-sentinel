import express from 'express'
import {
    FindPropertyByCarCodeController,
    FindRestrictionsNearPropertyController,
} from '../controllers/index.js'

export const router = express.Router()

router.get('/:carCode', async (req, res) => {
    const findPropertyByCarCodeController = new FindPropertyByCarCodeController()

    const { statusCode, body } = await findPropertyByCarCodeController.execute(req)

    res.status(statusCode).send(body)
})
router.get('/restrictions/:carCode', async (req, res) => {
    const findRestrictionsNearPropertyController = new FindRestrictionsNearPropertyController()

    const { statusCode, body } = await findRestrictionsNearPropertyController.execute(req)

    res.status(statusCode).send(body)
})
