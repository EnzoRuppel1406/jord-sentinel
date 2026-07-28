import { v4 as uuidv4 } from 'uuid'
import { PostgresCreateCompanyRepository } from '../repositories/postgres/createCompany.js'

export class CreateCompanyUseCase {
    async execute(createCompanyParams) {
        const companyId = uuidv4()

        const company = {
            ...createCompanyParams,
            id: companyId,
        }

        const postgresCreateCompanyRepository = new PostgresCreateCompanyRepository()

        const createdCompany = await postgresCreateCompanyRepository.execute(company)

        return createdCompany
    }
}
