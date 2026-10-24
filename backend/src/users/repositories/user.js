import { PostgresClient } from '../../database/postgres/client.js'

export class PostgresUserRepository {
    async create(createUserParams) {
        await PostgresClient.query(
            `
                INSERT INTO users (id, company_id, role_id, name, email, password)
                VALUES (
                    $1,
                    $2,
                    $3,
                    $4,
                    $5,
                    $6
                )
            `,
            [
                createUserParams.id,
                createUserParams.company,
                createUserParams.role,
                createUserParams.name,
                createUserParams.email,
                createUserParams.password,
            ]
        )

        const createdUser = await PostgresClient.query('SELECT * FROM users WHERE id = $1', [
            createUserParams.id,
        ])

        return createdUser[0]
    }

    async getById(userId) {
        const user = await PostgresClient.query('SELECT * FROM users WHERE id = $1', [userId])

        return user[0]
    }

    async getByEmail(email) {
        const user = await PostgresClient.query('SELECT * FROM users WHERE email = $1', [email])

        return user[0]
    }

    async update(userId, updateUserParams) {
        const updateFields = []
        const updateValues = []

        Object.keys(updateUserParams).forEach((key) => {
            updateFields.push(`${key} = $${updateValues.length + 1}`)
            updateValues.push(updateUserParams[key])
        })

        updateFields.push('updated_at = NOW()')
        updateValues.push(userId)

        const updateQuery = `
            UPDATE users
            SET ${updateFields.join(',')}
            WHERE id = $${updateFields.length}
            RETURNING *
        `

        const updatedUser = await PostgresClient.query(updateQuery, updateValues)

        return updatedUser[0]
    }

    async delete(userId) {
        const deletedUser = await PostgresClient.query(
            `
            UPDATE users
            SET active = false, updated_at = NOW(), deleted_at = NOW()
            WHERE id = $1
            RETURNING *
            `,
            [userId]
        )

        return deletedUser[0]
    }

    async listByCompanyId(companyId) {
        const list = await PostgresClient.query(
            `SELECT
                u.id,
                u.name,
                u.email,
                u.active,
                c.name AS company_name,
                r.name AS role_name,
                r.description AS role_description
            FROM users u
            JOIN companies c ON
            u.company_id = c.id
            JOIN roles r ON
            u.role_id = r.id
            WHERE u.company_id = $1
            `,
            [companyId]
        )
        return list
    }
}
