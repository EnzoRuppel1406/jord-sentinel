import {
    checkIfIdIsValid,
    invalidResponse,
    ok,
    userNotFoundResponse,
    serverError,
} from '../../shared/helpers/index.js'
import { DeactivateteUserUseCase } from '../use-cases/index.js'

export class DeactivateUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId

            const idIsValid = checkIfIdIsValid(userId)

            if (!idIsValid) {
                return invalidResponse()
            }

            const deactivateUserUseCase = new DeactivateteUserUseCase()

            const deactivatedUser = await deactivateUserUseCase.execute(userId)

            if (!deactivatedUser) {
                return userNotFoundResponse()
            }

            return ok(deactivatedUser)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
