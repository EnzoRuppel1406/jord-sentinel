import { InvalidCredentialsError } from '../../shared/errors/user.js'
import { badRequest, ok, serverError, unauthorized } from '../../shared/helpers/index.js'
import { AuthenticateUserUseCase } from '../use-cases/index.js'

export class AuthenticateUserController {
    async execute(httpRequest) {
        try {
            const { email, password } = httpRequest.body

            if (!email || !password) {
                return badRequest({ message: 'Email and password are required.' })
            }

            const authenticateUserUseCase = new AuthenticateUserUseCase()

            const user = await authenticateUserUseCase.execute(email, password)

            return ok(user)
        } catch (error) {
            if (error instanceof InvalidCredentialsError) {
                return unauthorized({ message: error.message })
            }
            console.log(error)
            return serverError()
        }
    }
}
