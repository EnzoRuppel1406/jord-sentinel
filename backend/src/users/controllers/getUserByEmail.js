import {
    checkIfEmailIsValid,
    invalidEmailResponse,
    ok,
    serverError,
    userNotFoundResponse,
} from '../../shared/helpers/index.js'
import { GetUserByEmailUseCase } from '../use-cases/index.js'

export class GetUserByEmailController {
    async execute(httpRequest) {
        try {
            const email = httpRequest.params.userEmail

            const emailIsValid = checkIfEmailIsValid(email)

            if (!emailIsValid) {
                return invalidEmailResponse()
            }

            const getUserByEmailUseCase = new GetUserByEmailUseCase()

            const user = await getUserByEmailUseCase.execute(email)

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
