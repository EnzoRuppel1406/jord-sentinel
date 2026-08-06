import { PostgresRoleRepository } from '../repositories/postgres/role.js'

export class ListRolesUseCase {
    async execute() {
        const postgresRoleRepository = new PostgresRoleRepository()

        const roles = await postgresRoleRepository.list()

        return roles
    }
}
