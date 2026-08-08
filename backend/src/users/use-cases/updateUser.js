import { PostgresCompanyRepository } from '../../companies/repositories/postgres/company.js'
import { PostgresRoleRepository } from '../../roles/repositories/postgres/role.js'
import { EmailAlreadyInUseError } from '../../shared/errors/user.js'

import { PostgresUserRepository } from '../repositories/user.js'

import bcrypt from 'bcrypt'

export class UpdateuserUseCase {
    async execute(userId, updateUserParams) {
        const postgresUserRepository = new PostgresUserRepository()

        const params = { ...updateUserParams }

        if (params.company) {
            const postgresCompanyRepository = new PostgresCompanyRepository()

            const company = await postgresCompanyRepository.getByName(params.company)

            if (!company) {
                throw new Error('Company not found.')
            }

            const companyId = company.id

            params.company_id = companyId

            delete params.company
        }

        if (params.role) {
            const postgresRoleRepository = new PostgresRoleRepository()

            const role = await postgresRoleRepository.getByName(params.role)

            if (!role) {
                throw new Error('Role not found.')
            }

            const roleId = role.id

            params.role_id = roleId

            delete params.role
        }

        if (params.email) {
            const userWithProvidedEmail = await postgresUserRepository.getByEmail(params.email)

            if (userWithProvidedEmail && userWithProvidedEmail.id !== userId) {
                throw new EmailAlreadyInUseError(updateUserParams.email)
            }
        }

        if (params.password) {
            const hashedPassword = await bcrypt.hash(params.password, 10)

            params.password = hashedPassword
        }

        const updatedUser = await postgresUserRepository.update(userId, params)

        return updatedUser
    }
}
