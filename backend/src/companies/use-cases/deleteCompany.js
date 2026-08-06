import { PostgresCompanyRepository } from '../repositories/postgres/company.js'

export class DeleteCompanyUseCase {
    async execute(companyId) {
        const postgresCompanyRepository = new PostgresCompanyRepository()

        const deletedCompany = await postgresCompanyRepository.delete(companyId)

        return deletedCompany
    }
}
