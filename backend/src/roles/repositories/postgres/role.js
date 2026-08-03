import { PostgresClient } from '../../../database/postgres/client.js'

export class PostgresRoleRepository {
    async createRole(createRoleParams) {
        await PostgresClient.query(
            'INSERT INTO roles (id, name, description) VALUES ($1, $2, $3)',
            [createRoleParams.id, createRoleParams.name, createRoleParams.description]
        )

        const createdRole = await PostgresClient.query('SElECT * FROM roles WHERE id = $1', [
            createRoleParams.id,
        ])

        return createdRole[0]
    }
}
