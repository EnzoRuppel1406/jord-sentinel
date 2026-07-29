import { PostgresClient } from '../../database/postgres/client.js'

export class PostgresDeleteCompanyRepository {
    async execute(companyId) {
        const deletedCompany = await PostgresClient.query(
            `
                DELETE FROM companies
                WHERE id = $1
                RETURNING *
            `,
            [companyId]
        )

        return deletedCompany[0]
    }
}
