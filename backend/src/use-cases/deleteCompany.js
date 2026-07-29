import { PostgresDeleteCompanyRepository } from '../repositories/postgres/deleteCompany.js'

export class DeleteCompanyUseCase {
    async execute(companyId) {
        const postgresDeleteCompanyRepository = new PostgresDeleteCompanyRepository()

        const deletedCompany = await postgresDeleteCompanyRepository.execute(companyId)

        return deletedCompany
    }
}
