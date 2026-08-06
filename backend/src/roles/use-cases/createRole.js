import { v4 as uuidv4 } from 'uuid'
import { PostgresRoleRepository } from '../repositories/postgres/role.js'

export class CreateRoleUseCase {
    async execute(createRoleParams) {
        const roleId = uuidv4()

        const role = { ...createRoleParams, id: roleId }

        const postgresRoleRepository = new PostgresRoleRepository()

        const createdRole = await postgresRoleRepository.create(role)

        return createdRole
    }
}
