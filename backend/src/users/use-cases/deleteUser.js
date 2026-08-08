import { PostgresUserRepository } from '../repositories/user.js'

export class DeleteUserUseCase {
    async execute(userId) {
        const postgresUserRepository = new PostgresUserRepository()

        const deletedUser = await postgresUserRepository.delete(userId)

        return deletedUser
    }
}
