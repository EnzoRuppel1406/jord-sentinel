import express from 'express'
import {
    GetCompanyByIdController,
    CreateCompanyController,
    UpdateCompanyController,
    DeletecompanyController,
} from '../controllers/index.js'

export const router = express.Router()

router
    .route('/:companyId')
    .get(async (req, res) => {
        const getCompanyByIdController = new GetCompanyByIdController()

        const { statusCode, body } = await getCompanyByIdController.execute(req)

        res.status(statusCode).send(body)
    })
    .put(async (req, res) => {
        const updateCompanyController = new UpdateCompanyController()
        const { statusCode, body } = await updateCompanyController.execute(req)

        res.status(statusCode).send(body)
    })
    .delete(async (req, res) => {
        const deleteCompanyController = new DeletecompanyController()
        const { statusCode, body } = await deleteCompanyController.execute(req)

        res.status(statusCode).send(body)
    })

router.post('/', async (req, res) => {
    const createCompanyController = new CreateCompanyController()
    const { statusCode, body } = await createCompanyController.execute(req)

    res.status(statusCode).send(body)
})
