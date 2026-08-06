import { PostgresRoleRepository } from '../repositories/postgres/role.js'

export class DeleteRoleUseCase {
    async execute(roleId) {
        const postgesRoleRepository = new PostgresRoleRepository()

        const deletedRole = await postgesRoleRepository.delete(roleId)

        return deletedRole
    }
}
