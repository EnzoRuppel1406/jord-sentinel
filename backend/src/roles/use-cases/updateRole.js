import { PostgresRoleRepository } from '../repositories/postgres/role.js'

export class UpdateRoleUseCase {
    async execute(roleId, updateRoleParams) {
        const postgresRoleRepository = new PostgresRoleRepository()

        const updatedRole = await postgresRoleRepository.update(roleId, updateRoleParams)

        return updatedRole
    }
}
