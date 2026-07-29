import 'dotenv/config'
import express from 'express'
import { CreateCompanyController } from './src/controllers/createCompany.js'
import { GetCompanyByIdController } from './src/controllers/getCompanyById.js'
import { UpdateCompanyController } from './src/controllers/updateCompany.js'
import { DeletecompanyController } from './src/controllers/deleteCompany.js'

const app = express()
app.use(express.json())

app.get('/api/companies/:companyId', async (req, res) => {
    const getCompanyByIdController = new GetCompanyByIdController()

    const { statusCode, body } = await getCompanyByIdController.execute(req)

    res.status(statusCode).send(body)
})

app.post('/api/companies', async (req, res) => {
    const createCompanyController = new CreateCompanyController()
    const { statusCode, body } = await createCompanyController.execute(req)

    res.status(statusCode).send(body)
})

app.put('/api/companies/:companyId', async (req, res) => {
    const updateCompanyController = new UpdateCompanyController()
    const { statusCode, body } = await updateCompanyController.execute(req)

    res.status(statusCode).send(body)
})

app.delete('/api/companies/:companyId', async (req, res) => {
    const deleteCompanyController = new DeletecompanyController()
    const { statusCode, body } = await deleteCompanyController.execute(req)

    res.status(statusCode).send(body)
})

app.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`))
