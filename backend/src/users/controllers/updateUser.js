import { EmailAlreadyInUseError } from '../../shared/errors/user.js'
import {
    badRequest,
    checkIfEmailIsValid,
    checkIfIdIsValid,
    checkIfPasswordIsValid,
    invalidEmailResponse,
    invalidPasswordResponse,
    invalidResponse,
    ok,
    serverError,
    someFieldIsBlankResponse,
    someFieldIsNotAllowedResponse,
} from '../../shared/helpers/index.js'
import { UpdateuserUseCase } from '../use-cases/index.js'

export class UpdateUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId

            const idIsValid = checkIfIdIsValid(userId)

            if (!idIsValid) {
                return invalidResponse()
            }

            const params = httpRequest.body

            const allowedFields = ['company', 'role', 'name', 'email', 'password']

            const someFieldIsNotAllowed = Object.keys(params).some(
                (field) => !allowedFields.includes(field)
            )

            if (someFieldIsNotAllowed) {
                return someFieldIsNotAllowedResponse()
            }

            const someFieldIsBlank = Object.keys(params).some(
                (field) => params[field].trim().length === 0
            )

            if (someFieldIsBlank) {
                return someFieldIsBlankResponse()
            }

            if (params.email) {
                const emailIsValid = checkIfEmailIsValid(params.email)

                if (!emailIsValid) {
                    return invalidEmailResponse()
                }
            }

            if (params.password) {
                const passwordIsValid = checkIfPasswordIsValid(params.password)

                if (!passwordIsValid) {
                    return invalidPasswordResponse()
                }
            }

            const updateUserUseCase = new UpdateuserUseCase()

            const updatedUser = await updateUserUseCase.execute(userId, params)

            return ok(updatedUser)
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }
            console.log(error)
            return serverError()
        }
    }
}
