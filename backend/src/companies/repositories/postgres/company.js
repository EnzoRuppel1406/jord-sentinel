import { PostgresClient } from '../../../database/postgres/client.js'

export class PostgresCompanyRepository {
    async createCompany(createCompanyParams) {
        await PostgresClient.query('INSERT INTO companies (id, name) VALUES ($1, $2)', [
            createCompanyParams.id,
            createCompanyParams.name,
        ])

        const createdCompany = await PostgresClient.query('SELECT * FROM companies WHERE id = $1', [
            createCompanyParams.id,
        ])

        return createdCompany[0]
    }

    async getCompanyById(companyId) {
        const company = await PostgresClient.query('SELECT * FROM companies WHERE id = $1', [
            companyId,
        ])

        return company[0]
    }

    async updateCompany(companyId, updateCompanyParams) {
        const updateFields = []
        const updateValues = []

        Object.keys(updateCompanyParams).forEach((key) => {
            updateFields.push(`${key} = $${updateValues.length + 1}`)
            updateValues.push(updateCompanyParams[key])
        })

        updateFields.push('updated_at = NOW()')
        updateValues.push(companyId)

        const updateQuery = `
            UPDATE companies
            SET ${updateFields.join(',')}
            WHERE id = $${updateValues.length}
            RETURNING *
        `

        const updatedCompany = await PostgresClient.query(updateQuery, updateValues)

        return updatedCompany[0]
    }

    async deleteCompany(companyId) {
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
