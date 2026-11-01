import { PostgresAnalysisRepository } from '../repositories/postgres/analysis.js'
import { PostgresUserRepository } from '../../users/repositories/user.js'
import { PostgresCompanyRepository } from '../../companies/repositories/postgres/company.js'
import { CompanyNotFoundError } from '../../shared/errors/index.js'

export class ListAnalysesByCompanyIdUseCase {
    async execute(companyId) {
        const postgresAnalysisRepository = new PostgresAnalysisRepository()
        const postgresUserRepository = new PostgresUserRepository()
        const postgresCompanyRepository = new PostgresCompanyRepository()

        const company = await postgresCompanyRepository.getById(companyId)

        if (!company) {
            throw new CompanyNotFoundError()
        }

        const analyses = await postgresAnalysisRepository.listByCompanyId(companyId)

        const analysesList = await Promise.all(
            analyses.map(async (analysis) => {
                const {
                    id,
                    user_id,
                    property_city,
                    property_state,
                    property_area,
                    car_status,
                    car_code,
                    risk_score,
                    risk_level,
                    created_at,
                } = analysis

                const user = await postgresUserRepository.getById(user_id)

                const date = created_at.toLocaleDateString('pt-BR', { timeZone: 'UTC' })

                return {
                    key: id,
                    carCode: car_code,
                    city: property_city,
                    state: property_state,
                    area: property_area,
                    propertyStatus: car_status,
                    riskScore: risk_score,
                    riskLevel: risk_level,
                    consultedBy: user.name,
                    date,
                }
            })
        )

        return analysesList
    }
}
