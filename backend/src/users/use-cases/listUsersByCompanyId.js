import { PostgresCompanyRepository } from '../../companies/repositories/postgres/company.js'
import { CompanyNotFoundError } from '../../shared/errors/index.js'
import { PostgresUserRepository } from '../repositories/user.js'

export class ListUsersByCompanyIdUseCase {
    async execute(companyId) {
        const postgresUserRepository = new PostgresUserRepository()
        const postgresCompanyRepository = new PostgresCompanyRepository()

        const company = await postgresCompanyRepository.getById(companyId)

        if (!company) {
            throw new CompanyNotFoundError()
        }

        const users = await postgresUserRepository.listByCompanyId(companyId)

        const usersList = await Promise.all(
            users.map(async (user) => {
                const { id, name, email, active, company_name, role_name, role_description } = user

                return {
                    key: id,
                    name,
                    email,
                    isActive: active,
                    company: company_name,
                    role: role_name,
                    roleDescription: role_description,
                }
            })
        )

        return usersList
    }
}
