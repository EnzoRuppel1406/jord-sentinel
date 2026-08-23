import { v4 as uuidv4 } from 'uuid'
import { PostgresAnalysisRepository } from '../repositories/analysis.js'

export class CreateAnalysisUseCase {
    async execute(createAnalysisParams) {
        const analysisId = uuidv4()

        const postgresAnalysesRepository = new PostgresAnalysisRepository()

        const { restrictions } = createAnalysisParams

        const params = {
            ...createAnalysisParams,
            id: analysisId,
            restrictions: restrictions.map((restriction) => {
                return {
                    id: uuidv4(),
                    analysisId,
                    restrictionType: restriction.type,
                    area: restriction.area,
                    details: restriction.details,
                }
            }),
        }

        params.status === 'Restrito' ? (params.status = 'restricted') : (params.status = 'free')

        const createdAnalysis = await postgresAnalysesRepository.create(params)

        return createdAnalysis
    }
}
