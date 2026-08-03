import { PostgresCompanyRepository } from '../repositories/postgres/company.js'

export class GetCompanyByIdUseCase {
    async execute(companyId) {
        const postgresCompanyRepository = new PostgresCompanyRepository()

        const company = await postgresCompanyRepository.getCompanyById(companyId)

        return company
    }
}
