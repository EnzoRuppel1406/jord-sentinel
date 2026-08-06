import { PostgresCompanyRepository } from '../repositories/postgres/company.js'

export class UpdateCompanyUseCase {
    async execute(companyId, updateCompanyParams) {
        const company = { ...updateCompanyParams }

        const postgresCompanyRepository = new PostgresCompanyRepository()

        const updatedCompany = await postgresCompanyRepository.update(companyId, company)

        return updatedCompany
    }
}
