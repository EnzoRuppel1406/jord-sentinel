import 'dotenv/config'
import express from 'express'
import { CreateCompanyController } from './src/controllers/createCompany.js'
import { GetCompanyByIdController } from './src/controllers/getCompanyById.js'

const app = express()
app.use(express.json())

app.post('/api/companies', async (req, res) => {
    const createCompanyController = new CreateCompanyController()
    const { statusCode, body } = await createCompanyController.execute(req)

    res.status(statusCode).send(body)
})

app.get('/companies/:companyId', async (req, res) => {
    const getCompanyByIdController = new GetCompanyByIdController()

    const { statusCode, body } = await getCompanyByIdController.execute(req)

    res.status(statusCode).send(body)
})

app.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`))
