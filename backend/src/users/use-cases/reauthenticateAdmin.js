import { InvalidCredentialsError } from '../../shared/errors/user.js'
import { checkForAdminAccess } from '../../shared/helpers/user.js'
import { PostgresUserRepository } from '../repositories/user.js'
import bcrypt from 'bcrypt'

export class ReauthenticateAdminUseCase {
    async execute(userId, password) {
        const postgresUserRepository = new PostgresUserRepository()

        const user = await postgresUserRepository.getById(userId)

        if (!user) {
            throw new InvalidCredentialsError('Invalid credentials used')
        }

        const passwordMatches = await bcrypt.compare(password, user.password)

        if (!passwordMatches) {
            throw new InvalidCredentialsError('Invalid credentials used')
        }

        const userIsAdmin = await checkForAdminAccess(user.role_id)

        if (!userIsAdmin) {
            throw new InvalidCredentialsError('User does not have admin privileges.')
        }
    }
}
