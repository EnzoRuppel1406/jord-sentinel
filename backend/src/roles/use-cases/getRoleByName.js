import { PostgresRoleRepository } from '../repositories/postgres/role.js'

export class GetRoleByNameUseCase {
    async execute(roleName) {
        const postgresRoleRepository = new PostgresRoleRepository()

        const role = await postgresRoleRepository.getByName(roleName)

        return role
    }
}
