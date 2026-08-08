import { PostgresUserRepository } from '../repositories/user.js'

export class GetUserByIdUseCase {
    async execute(userId) {
        const postgresUserRepository = new PostgresUserRepository()

        const user = await postgresUserRepository.getById(userId)

        return user
    }
}
