import { PostgresUserRepository } from '../repositories/user.js'

export class ActivateteUserUseCase {
    async execute(userId) {
        const postgresUserRepository = new PostgresUserRepository()

        const activatedUser = await postgresUserRepository.activate(userId)

        return activatedUser
    }
}
