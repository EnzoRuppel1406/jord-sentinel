import 'dotenv/config'
import express from 'express'
import { router as companyRouter } from './src/companies/routes/company.js'
import { router as roleRouter } from './src/roles/routes/role.js'

const app = express()
app.use(express.json())
app.use('/api/companies', companyRouter)
app.use('/api/roles', roleRouter)

app.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`))
