import express from 'express'
import {
    GetCompanyByIdController,
    CreateCompanyController,
    UpdateCompanyController,
    DeletecompanyController,
    ListCompaniesController,
    GetCompanyByNameController,
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

router
    .route('/')
    .post(async (req, res) => {
        const createCompanyController = new CreateCompanyController()
        const { statusCode, body } = await createCompanyController.execute(req)

        res.status(statusCode).send(body)
    })
    .get(async (req, res) => {
        const listCompaniesController = new ListCompaniesController()

        const { statusCode, body } = await listCompaniesController.execute()

        res.status(statusCode).send(body)
    })

router.get('/name/:companyName', async (req, res) => {
    const getCompanyByNameController = new GetCompanyByNameController()

    const { statusCode, body } = await getCompanyByNameController.execute(req)

    res.status(statusCode).send(body)
})
