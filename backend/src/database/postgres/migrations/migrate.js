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

        await client.query(`
            CREATE TABLE IF NOT EXISTS public.schema_migrations (
                filename TEXT PRIMARY KEY,
                applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            )
        `)

        for (const file of files) {
            console.log(`Running migration: ${file}`)

            const applied = await client.query(
                'SELECT 1 FROM public.schema_migrations WHERE filename = $1',
                [file]
            )

            if (applied.rowCount > 0) {
                console.log(`Migration already applied: ${file}`)
                continue
            }

            const filePath = path.join(__dirname, file)
            const script = fs.readFileSync(filePath, 'utf-8')

            await client.query('BEGIN')
            try {
                await client.query(script)
                await client.query('INSERT INTO public.schema_migrations (filename) VALUES ($1)', [
                    file,
                ])
                await client.query('COMMIT')
            } catch (error) {
                await client.query('ROLLBACK')
                throw error
            }
        }
        console.log('Migrations executed successfully.')
    } catch (error) {
        console.log(error)
        process.exitCode = 1
    } finally {
        client.release()
    }
}

execMigrations()
