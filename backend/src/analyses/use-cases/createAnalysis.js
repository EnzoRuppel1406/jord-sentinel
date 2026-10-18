import { v4 as uuidv4 } from 'uuid'
import { PostgresAnalysisRepository } from '../repositories/postgres/analysis.js'

export class CreateAnalysisUseCase {
    async execute(createAnalysisParams) {
        const analysisId = uuidv4()

        const postgresAnalysesRepository = new PostgresAnalysisRepository()

        const { restrictions } = createAnalysisParams

        const params = {
            ...createAnalysisParams,
            id: analysisId,
            restrictions: restrictions
                ? restrictions.map((restriction) => {
                      return {
                          id: uuidv4(),
                          analysisId,
                          restrictionType: restriction.type,
                          area: restriction.area,
                          details: restriction.details,
                      }
                  })
                : [],
        }

        const statusMap = {
            AT: 'free',
            CA: 'restricted',
            PE: 'conditional',
        }

        params.status = statusMap[params.status]

        const createdAnalysis = await postgresAnalysesRepository.create(params)

        return createdAnalysis
    }
}
