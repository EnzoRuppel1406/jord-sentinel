import { v4 as uuidv4 } from 'uuid'
import { PostgresAnalysisRepository } from '../repositories/analysis.js'

export class CreateAnalysisUseCase {
    async execute(createAnalysisParams) {
        const analysisId = uuidv4()

        const postgresAnalysesRepository = new PostgresAnalysisRepository()

        const params = { ...createAnalysisParams, id: analysisId }

        const createdAnalysis = await postgresAnalysesRepository.create(params)

        return createdAnalysis
    }
}
