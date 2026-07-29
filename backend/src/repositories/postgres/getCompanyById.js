import { PostgresClient } from '../../database/postgres/client.js'

export class PostgresGetCompanyByIdRepository {
    async execute(companyId) {
        const company = await PostgresClient.query('SELECT * FROM companies WHERE id = $1', [
            companyId,
        ])

        return company[0]
    }
}
