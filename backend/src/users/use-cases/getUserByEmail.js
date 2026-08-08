import { PostgresUserRepository } from '../repositories/user.js'

export class GetUserByEmailUseCase {
    async execute(email) {
        const postgresUserRepository = new PostgresUserRepository()

        const user = await postgresUserRepository.getByEmail(email)

        return user
    }
}
