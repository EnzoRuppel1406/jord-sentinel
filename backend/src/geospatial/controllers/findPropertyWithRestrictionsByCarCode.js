import {
    invalidCarCodeResponse,
    ok,
    propertyNotFoundResponse,
    serverError,
} from '../../shared/helpers/index.js'
import { FindPropertyWithRestrictionsUseCase } from '../use-cases/index.js'

export class FindPropertyByCarCodeController {
    async execute(httpRequest) {
        try {
            const carCode = httpRequest.params.carCode

            if (carCode.length !== 43) {
                return invalidCarCodeResponse()
            }

            const findPropertyWithRestrictionsUseCase = new FindPropertyWithRestrictionsUseCase()

            const property = await findPropertyWithRestrictionsUseCase.execute(carCode)

            if (!property) {
                return propertyNotFoundResponse()
            }

            return ok(property)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
