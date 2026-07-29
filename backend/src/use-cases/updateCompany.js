import { PostgresUpdateCompanyRepository } from '../repositories/postgres/updateCompany.js'

export class UpdateCompanyUseCase {
    async execute(companyId, updateCompanyParams) {
        const company = { ...updateCompanyParams }

        const postgresUpdateCompanyRepository = new PostgresUpdateCompanyRepository()

        const updatedCompany = await postgresUpdateCompanyRepository.execute(companyId, company)

        return updatedCompany
    }
}
