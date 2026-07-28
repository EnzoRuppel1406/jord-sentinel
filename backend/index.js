import 'dotenv/config'
import express from 'express'
import { PostgresClient } from './src/database/postgres/client.js'

const app = express()

app.get('/', async (req, res) => {
    const result = await PostgresClient.query('SELECT * FROM companies;')

    res.json(result)
})

app.listen(process.env.PORT, () => console.log('listening on port 8080'))
