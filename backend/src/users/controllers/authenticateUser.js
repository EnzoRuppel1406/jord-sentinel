import { badRequest, ok, serverError } from '../../shared/helpers/index.js'
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

            if (!user) {
                return badRequest({ message: 'Invalid email or password' })
            }

            return ok(user)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
