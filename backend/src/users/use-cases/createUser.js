import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'

import { PostgresUserRepository } from '../repositories/user.js'
import { PostgresCompanyRepository } from '../../companies/repositories/postgres/company.js'
import { PostgresRoleRepository } from '../../roles/repositories/postgres/role.js'
import { EmailAlreadyInUseError } from '../../shared/errors/user.js'

export class CreateUserUseCase {
    async execute(createUserParams) {
        const postgresCompanyRepository = new PostgresCompanyRepository()

        const company = await postgresCompanyRepository.getByName(createUserParams.company)

        if (!company) {
            throw new Error('Company not found.')
        }

        const companyId = company.id

        const postgresRoleRepository = new PostgresRoleRepository()

        const role = await postgresRoleRepository.getByName(createUserParams.role)

        if (!role) {
            throw new Error('Role not found.')
        }

        const roleId = role.id

        const postgresUserRepository = new PostgresUserRepository()

        const userWithProvidedEmail = await postgresUserRepository.getByEmail(
            createUserParams.email
        )

        if (userWithProvidedEmail) {
            throw new EmailAlreadyInUseError(createUserParams.email)
        }

        const userId = uuidv4()

        const hashedPassword = await bcrypt.hash(createUserParams.password, 10)

        const user = {
            ...createUserParams,
            id: userId,
            company: companyId,
            role: roleId,
            password: hashedPassword,
        }

        const createdUser = await postgresUserRepository.create(user)

        return createdUser
    }
}
