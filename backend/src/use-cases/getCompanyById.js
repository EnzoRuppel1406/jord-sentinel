import { PostgresGetCompanyByIdRepository } from '../repositories/postgres/getCompanyById.js'

export class GetCompanyByIdUseCase {
    async execute(companyId) {
        const postgresGetCompanyByIdRepository = new PostgresGetCompanyByIdRepository()

        const company = await postgresGetCompanyByIdRepository.execute(companyId)

        return company
    }
}
