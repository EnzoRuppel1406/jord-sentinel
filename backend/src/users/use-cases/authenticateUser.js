import { InvalidCredentialsError } from '../../shared/errors/user.js'
import { PostgresUserRepository } from '../repositories/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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

        const token = jwt.sign(
            {
                sub: user.id,
                name: user.name,
                email: user.email,
                companyId: user.company_id,
                roleId: user.role_id,
            },
            process.env.ACCESS_TOKEN_KEY,
            {
                expiresIn: '7d',
            }
        )

        return token
    }
}
