import { pool } from '../client.js'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'

const seed = async () => {
    const client = await pool.connect()
    try {
        await client.query('BEGIN')

        const financeCompanyId = uuidv4()
        const agroCompanyId = uuidv4()
        const adminRoleId = uuidv4()
        const analystRoleId = uuidv4()

        const financeCompany = await client.query(
            'INSERT INTO companies (id, name) VALUES($1, $2)',
            [financeCompanyId, 'Jörð Finance']
        )

        const agroCompany = await client.query('INSERT INTO companies (id, name) VALUES($1, $2)', [
            agroCompanyId,
            'Agro Crédito',
        ])

        const adminRole = await client.query(
            'INSERT INTO roles (id, name, description) VALUES($1, $2, $3)',
            [
                adminRoleId,
                'Admin',
                'Responsável pelo gerenciamento da organização, usuários, funções e permissões de acesso da plataforma',
            ]
        )

        const analystRole = await client.query(
            'INSERT INTO roles (id, name, description) VALUES($1, $2, $3)',
            [
                analystRoleId,
                'Analista',
                'Responsável pela análise de propriedades rurais perante a legislação ambiental do MCR',
            ]
        )

        const financeAdminPassword = await bcrypt.hash('admin123', 10)
        const financeAnalystPassword = await bcrypt.hash('analista123', 10)
        const agroAnalystPassword = await bcrypt.hash('analistaAgro123', 10)

        await client.query(
            'INSERT INTO users (id, company_id, role_id, name, email, password) VALUES($1, $2, $3, $4, $5, $6)',
            [
                uuidv4(),
                financeCompanyId,
                adminRoleId,
                'John Doe',
                'johndoe@jordfinance.com',
                financeAdminPassword,
            ]
        )

        await client.query(
            'INSERT INTO users (id, company_id, role_id, name, email, password) VALUES($1, $2, $3, $4, $5, $6)',
            [
                uuidv4(),
                financeCompanyId,
                analystRoleId,
                'Jane Doe',
                'janedoe@jordfinance.com',
                financeAnalystPassword,
            ]
        )

        await client.query(
            'INSERT INTO users (id, company_id, role_id, name, email, password) VALUES($1, $2, $3, $4, $5, $6)',
            [
                uuidv4(),
                agroCompanyId,
                analystRoleId,
                'Carlos Silva',
                'carlos@agrocredito.com',
                agroAnalystPassword,
            ]
        )

        await client.query('COMMIT')
        console.log('Seeds executed successfully.')
    } catch (error) {
        await client.query('ROLLBACK')

        console.log(`Error executing seeds: ${error}`)
    } finally {
        await client.release()
        await pool.end()
    }
}

seed()
