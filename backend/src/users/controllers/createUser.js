import { EmailAlreadyInUseError } from '../../shared/errors/user.js'
import {
    badRequest,
    serverError,
    checkIfEmailIsValid,
    checkIfPasswordIsValid,
    invalidEmailResponse,
    invalidPasswordResponse,
    created,
} from '../../shared/helpers/index.js'
import { CreateUserUseCase } from '../use-cases/index.js'

export class CreateUserController {
    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            const requiredFields = ['name', 'company', 'role', 'email', 'password']

            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return badRequest({ message: `Missing param ${field}` })
                }
            }

            const emailIsValid = checkIfEmailIsValid(params.email)

            if (!emailIsValid) {
                return invalidEmailResponse()
            }

            const passwordIsValid = checkIfPasswordIsValid(params.password)

            if (!passwordIsValid) {
                return invalidPasswordResponse()
            }

            const createUserUseCase = new CreateUserUseCase()

            const createdUser = await createUserUseCase.execute(params)

            return created(createdUser)
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }
            console.log(error)
            return serverError()
        }
    }
}
