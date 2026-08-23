import {
    badRequest,
    checkIfIdIsValid,
    created,
    invalidResponse,
    serverError,
} from '../../shared/helpers/index.js'
import { CreateAnalysisUseCase } from '../use-cases/index.js'

export class CreateAnalysisController {
    async execute(httpRequest, user) {
        try {
            const createAnalysisParams = httpRequest.body

            const { restrictions } = createAnalysisParams

            const { sub: userId, companyId } = user

            const userIdIsValid = checkIfIdIsValid(userId)
            const companyIdIsValid = checkIfIdIsValid(companyId)

            if (!userIdIsValid || !companyIdIsValid) {
                return invalidResponse()
            }

            if (restrictions) {
                const restrictionsRequiredFields = ['type', 'area', 'details']

                for (const restriction of restrictions) {
                    for (const field of restrictionsRequiredFields) {
                        if (!restriction[field]) {
                            badRequest({ message: `Missing param ${field}.` })
                        }
                    }
                }
            }

            const params = { ...createAnalysisParams, userId, companyId }

            const analysisRequiredFields = ['userId', 'companyId', 'status', 'carCode']

            for (const field of analysisRequiredFields) {
                if (!params[field]) {
                    return badRequest({ message: `Missing param ${field}.` })
                }
            }

            console.log(params)
            const createAnalysisUseCase = new CreateAnalysisUseCase()

            const analysis = await createAnalysisUseCase.execute(params)

            return created(analysis)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
