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

        const { sub: userId, companyId } = user

        const userIdIsValid = checkIfIdIsValid(userId)
        const companyIdIsValid = checkIfIdIsValid(companyId)

        if (!userIdIsValid || !companyIdIsValid) {
            return invalidResponse()
        }

        const params = { ...createAnalysisParams, userId, companyId }

        const requiredFields = ['userId', 'companyId', 'status', 'carCode']

        for (const field of requiredFields) {
            if (!params[field] || params[field].trim().length === 0) {
                return badRequest({ message: `Missing param ${field}.` })
            }
        }

        const createAnalysisUseCase = new CreateAnalysisUseCase()

        const analysis = await createAnalysisUseCase.execute(params)

        return created(analysis)
    }
}
