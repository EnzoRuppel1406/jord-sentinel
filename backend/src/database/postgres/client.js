import pg from 'pg'

const { Pool } = pg

export const pool = new Pool({
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
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
