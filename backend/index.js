import 'dotenv/config'
import express from 'express'
import { router as companyRouter } from './src/companies/routes/company.js'
import { router as roleRouter } from './src/roles/routes/role.js'
import { router as userRouter } from './src/users/routes/user.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

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

app.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`))
