import { PostgresClient } from '../../../database/postgres/client.js'

export class PostgresRoleRepository {
    async create(createRoleParams) {
        await PostgresClient.query(
            'INSERT INTO roles (id, name, description) VALUES ($1, $2, $3)',
            [createRoleParams.id, createRoleParams.name, createRoleParams.description]
        )

        const createdRole = await PostgresClient.query('SELECT * FROM roles WHERE id = $1', [
            createRoleParams.id,
        ])

        return createdRole[0]
    }

    async getById(roleId) {
        const role = await PostgresClient.query('SELECT * FROM roles WHERE id = $1', [roleId])

        return role[0]
    }

    async update(roleId, updateRoleParams) {
        const updateFields = []
        const updateValues = []

        Object.keys(updateRoleParams).forEach((key) => {
            updateFields.push(`${key} = $${updateValues.length + 1}`)
            updateValues.push(updateRoleParams[key])
        })

        updateValues.push(roleId)

        const updateQuery = `
            UPDATE roles
            SET ${updateFields.join(',')}
            WHERE id = $${updateValues.length}
            RETURNING *
        `

        const updatedRole = await PostgresClient.query(updateQuery, updateValues)

        return updatedRole[0]
    }

    async delete(roleId) {
        const deletedRole = await PostgresClient.query(
            `
                UPDATE roles
                SET active = FALSE, updated_at = NOW(), deleted_at = NOW()
                WHERE id = $1
                RETURNING *
            `,
            [roleId]
        )

        return deletedRole[0]
    }

    async list() {
        return await PostgresClient.query('SELECT * FROM roles WHERE deleted_at IS NULL')
    }

    async getByName(roleName) {
        const role = await PostgresClient.query('SELECT * FROM roles WHERE name = $1', [roleName])

        return role[0]
    }
}
