import 'dotenv/config'
import express from 'express'
import { router as companyRouter } from './src/companies/routes/company.js'

const app = express()
app.use(express.json())
app.use('/api/companies', companyRouter)

app.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`))
