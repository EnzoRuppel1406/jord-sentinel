import { PostgresCompanyRepository } from '../../companies/repositories/postgres/company.js'
import { CompanyNotFoundError } from '../../shared/errors/index.js'
import { PostgresAnalysisRepository } from '../repositories/postgres/analysis.js'

export class SummarizeAnalysesByCompanyIdUseCase {
    async execute(companyId) {
        const postgresAnalysisRepository = new PostgresAnalysisRepository()
        const postgresCompanyRepository = new PostgresCompanyRepository()

        const company = await postgresCompanyRepository.getById(companyId)

        if (!company) {
            throw new CompanyNotFoundError()
        }

        const summary = await postgresAnalysisRepository.summarizeByCompanyId(companyId)

        return summary
    }
}
