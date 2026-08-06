import { PostgresCompanyRepository } from '../repositories/postgres/company.js'

export class GetCompanyByNameUseCase {
    async execute(companyName) {
        const postgresCompanyRepository = new PostgresCompanyRepository()

        const company = await postgresCompanyRepository.getByName(companyName)

        return company
    }
}
