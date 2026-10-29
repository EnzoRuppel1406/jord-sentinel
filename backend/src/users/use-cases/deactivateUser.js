import { PostgresUserRepository } from '../repositories/user.js'

export class DeactivateteUserUseCase {
    async execute(userId) {
        const postgresUserRepository = new PostgresUserRepository()

        const deactivatedUser = await postgresUserRepository.deactivate(userId)

        return deactivatedUser
    }
}
