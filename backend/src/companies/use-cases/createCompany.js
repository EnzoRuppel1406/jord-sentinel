import { v4 as uuidv4 } from 'uuid'
import { PostgresCompanyRepository } from '../repositories/postgres/company.js'

export class CreateCompanyUseCase {
    async execute(createCompanyParams) {
        const companyId = uuidv4()

        const company = {
            ...createCompanyParams,
            id: companyId,
        }

        const postgresCompanyRepository = new PostgresCompanyRepository()

        const createdCompany = await postgresCompanyRepository.createCompany(company)

        return createdCompany
    }
}
