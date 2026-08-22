import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') })

import pg from 'pg'

const { Pool } = pg

export const pool = new Pool({
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: String(process.env.POSTGRES_PASSWORD || ''),
    port: Number(process.env.POSTGRES_PORT || 5432),
})

export const PostgresClient = {
    async query(query, params) {
        const client = await pool.connect()

        try {
            const result = await client.query(query, params)
            return result.rows
        } finally {
            await client.release()
        }
    },
}
