import { PostgresCompanyRepository } from '../repositories/postgres/company.js'

export class ListCompaniesUseCase {
    async execute() {
        const postgresCompanyRepository = new PostgresCompanyRepository()

        const companies = await postgresCompanyRepository.list()

        return companies
    }
}
