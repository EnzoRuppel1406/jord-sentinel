import { PostgresAnalysisRepository } from '../repositories/analysis.js'
import { PostgresUserRepository } from '../../users/repositories/user.js'
import { PostgresCompanyRepository } from '../../companies/repositories/postgres/company.js'

export class ListAnalysesByCompanyIdUseCase {
    async execute(companyId) {
        const postgresAnalysisRepository = new PostgresAnalysisRepository()
        const postgresUserRepository = new PostgresUserRepository()
        const postgresCompanyRepository = new PostgresCompanyRepository()

        const company = await postgresCompanyRepository.getById(companyId)

        if (!company) {
            throw new Error('Company not found.')
        }

        const analyses = await postgresAnalysisRepository.listByCompanyId(companyId)

        const analysesList = await Promise.all(
            analyses.map(async (analysis) => {
                const { id, user_id, analysis_status, car_code, created_at } = analysis

                const user = await postgresUserRepository.getById(user_id)

                const date = created_at.toLocaleDateString('pt-BR', { timeZone: 'UTC' })

                return {
                    key: id,
                    carCode: car_code,
                    status: analysis_status,
                    consultedBy: user.name,
                    date,
                }
            })
        )

        return analysesList
    }
}

const test = new ListAnalysesByCompanyIdUseCase()

test.execute('86f81fa0-b62b-4983-a0b4-30d2332d6662')
