import { PostgresRoleRepository } from '../repositories/postgres/role.js'

export class GetRoleByIdUseCase {
    async execute(roleId) {
        const postgresRoleRepository = new PostgresRoleRepository()

        const role = await postgresRoleRepository.getRoleById(roleId)

        return role
    }
}
