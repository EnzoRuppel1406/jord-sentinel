import { PostgresClient } from '../../database/postgres/client.js'

export class PostgresCreateCompanyRepository {
    async execute(createCompanyParams) {
        await PostgresClient.query('INSERT INTO companies (id, name) VALUES ($1, $2)', [
            createCompanyParams.id,
            createCompanyParams.name,
        ])

        const createdCompany = await PostgresClient.query('SELECT * FROM companies WHERE id = $1', [
            createCompanyParams.id,
        ])

        return createdCompany[0]
    }
}
