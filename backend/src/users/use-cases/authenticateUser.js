import { PostgresUserRepository } from '../repositories/user.js'
import bcrypt from 'bcrypt'

export class AuthenticateUserUseCase {
    async execute(email, password) {
        const postgresUserRepository = new PostgresUserRepository()

        const user = await postgresUserRepository.getByEmail(email)

        if (!user) {
            return null
        }

        const passwordMatches = await bcrypt.compare(password, user.password)

        if (!passwordMatches) {
            return null
        }

        return user
    }
}
