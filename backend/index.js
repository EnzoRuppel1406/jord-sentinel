import 'dotenv/config'
import express from 'express'
import { PostgresClient } from './src/database/postgres/client.js'
import { CreateCompanyController } from './src/controllers/createCompany.js'

const app = express()
app.use(express.json())

app.post('/api/companies', async (req, res) => {
    const createCompanyController = new CreateCompanyController()
    const { statusCode, body } = await createCompanyController.execute(req)

    res.status(statusCode).send(body)
})

app.get('/', async (req, res) => {
    const result = await PostgresClient.query('SELECT * FROM companies;')

    res.json(result)
})

app.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`))
