import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { pool } from '../client.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const execMigrations = async () => {
    const client = await pool.connect()
    try {
        const migrationsPath = path.join(__dirname)
        const files = fs
            .readdirSync(migrationsPath)
            .filter((file) => file.endsWith('.sql'))
            .sort()

        for (const file of files) {
            const filePath = path.join(__dirname, file)
            const script = fs.readFileSync(filePath, 'utf-8')

            console.log(`Running migration: ${file}`)

            await client.query(script)
        }

        console.log('Migrations executed successfully.')
    } catch (error) {
        console.log(error)
    } finally {
        client.release()
    }
}

execMigrations()
