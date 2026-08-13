import { InvalidCredentialsError } from '../../shared/errors/user.js'
import { PostgresUserRepository } from '../repositories/user.js'
import bcrypt from 'bcrypt'

export class AuthenticateUserUseCase {
    async execute(email, password) {
        const postgresUserRepository = new PostgresUserRepository()

        const user = await postgresUserRepository.getByEmail(email)

        if (!user) {
            throw new InvalidCredentialsError()
        }

        const passwordMatches = await bcrypt.compare(password, user.password)

        if (!passwordMatches) {
            throw new InvalidCredentialsError()
        }

        return user
    }
}
