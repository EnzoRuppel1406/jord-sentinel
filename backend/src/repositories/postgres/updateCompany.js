import { PostgresClient } from '../../database/postgres/client.js'

export class PostgresUpdateCompanyRepository {
    async execute(companyId, updateCompanyParams) {
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
}
