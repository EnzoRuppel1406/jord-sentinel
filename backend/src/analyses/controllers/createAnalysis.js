import {
    badRequest,
    checkIfIdIsValid,
    created,
    invalidResponse,
} from '../../shared/helpers/index.js'
import { CreateAnalysisUseCase } from '../use-cases/index.js'

export class CreateAnalysisController {
    async execute(httpRequest, user) {
        const createAnalysisParams = httpRequest.body

        const { findings } = createAnalysisParams

        const { sub: userId, companyId } = user

        const userIdIsValid = checkIfIdIsValid(userId)
        const companyIdIsValid = checkIfIdIsValid(companyId)

        if (!userIdIsValid || !companyIdIsValid) {
            return invalidResponse()
        }

        if (findings) {
            const findingsRequiredFields = ['restriction', 'area', 'details']

            for (const finding of findings) {
                for (const field of findingsRequiredFields) {
                    if (!finding[field]) {
                        badRequest({ message: `Missing param ${field}.` })
                    }
                }
            }
        }

        const params = { ...createAnalysisParams, userId, companyId }

        const analysisRequiredFields = ['userId', 'companyId', 'status', 'carCode']

        for (const field of analysisRequiredFields) {
            if (!params[field] || params[field].trim().length === 0) {
                return badRequest({ message: `Missing param ${field}.` })
            }
        }

        const createAnalysisUseCase = new CreateAnalysisUseCase()

        const analysis = await createAnalysisUseCase.execute(params)

        return created(analysis)
    }
}
