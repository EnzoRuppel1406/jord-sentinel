import {
    checkIfIdIsValid,
    invalidResponse,
    ok,
    userNotFoundResponse,
    serverError,
} from '../../shared/helpers/index.js'
import { ActivateteUserUseCase } from '../use-cases/index.js'

export class ActivateUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId

            const idIsValid = checkIfIdIsValid(userId)

            if (!idIsValid) {
                return invalidResponse()
            }

            const activateUserUseCase = new ActivateteUserUseCase()

            const activatedUser = await activateUserUseCase.execute(userId)

            if (!activatedUser) {
                return userNotFoundResponse()
            }

            return ok(activatedUser)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
