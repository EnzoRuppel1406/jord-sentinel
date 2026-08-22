import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import { router as companyRouter } from './src/companies/routes/company.js'
import { router as roleRouter } from './src/roles/routes/role.js'
import { router as userRouter } from './src/users/routes/user.js'
import { router as analysisRouter } from './src/analyses/routes/analysis.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../.env') })

const app = express()
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    })
)
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded())
app.use('/api/companies', companyRouter)
app.use('/api/roles', roleRouter)
app.use('/api/users', userRouter)
app.use('/api/analyses', analysisRouter)

app.listen(process.env.BACKEND_PORT, () =>
    console.log(`listening on port ${process.env.BACKEND_PORT}`)
)
