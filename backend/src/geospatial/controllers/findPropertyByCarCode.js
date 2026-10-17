import {
    invalidCarCodeResponse,
    ok,
    propertyNotFoundResponse,
    serverError,
} from '../../shared/helpers/index.js'
import { FindPropertyByCarCodeUseCase } from '../use-cases/findPropertyByCarCode.js'

export class FindPropertyByCarCodeController {
    async execute(httpRequest) {
        try {
            const carCode = httpRequest.params.carCode

            if (carCode.length !== 43) {
                return invalidCarCodeResponse()
            }

            const findPropertyByCarCodeUseCase = new FindPropertyByCarCodeUseCase()

            const property = await findPropertyByCarCodeUseCase.execute(carCode)

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
