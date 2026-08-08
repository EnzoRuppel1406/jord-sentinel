import {
    checkIfIdIsValid,
    invalidResponse,
    ok,
    serverError,
    userNotFoundResponse,
} from '../../shared/helpers/index.js'
import { GetUserByIdUseCase } from '../use-cases/index.js'

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId

            const idIsValid = checkIfIdIsValid(userId)

            if (!idIsValid) {
                return invalidResponse()
            }

            const getUserByIdUseCase = new GetUserByIdUseCase()

            const user = await getUserByIdUseCase.execute(userId)

            if (!user) {
                return userNotFoundResponse()
            }

            return ok(user)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
