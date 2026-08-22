import { v4 as uuidv4 } from 'uuid'
import { PostgresAnalysisRepository } from '../repositories/analysis.js'

export class CreateAnalysisUseCase {
    async execute(createAnalysisParams) {
        const analysisId = uuidv4()

        const postgresAnalysesRepository = new PostgresAnalysisRepository()

        const { findings } = createAnalysisParams

        const params = {
            ...createAnalysisParams,
            id: analysisId,
            findings: findings.map((finding) => {
                return {
                    id: uuidv4(),
                    analysisId,
                    restrictionType: finding.restriction,
                    area: finding.area,
                    details: finding.details,
                }
            }),
        }

        const createdAnalysis = await postgresAnalysesRepository.create(params)

        return createdAnalysis
    }
}
