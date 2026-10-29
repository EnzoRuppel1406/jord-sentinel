import { InvalidCredentialsError } from '../../shared/errors/user.js'
import { badRequest, ok, serverError, unauthorized } from '../../shared/helpers/index.js'
import { ReauthenticateAdminUseCase } from '../use-cases/index.js'

export class ReauthenticateUserController {
    async execute(httpRequest) {
        try {
            const { password } = httpRequest.body
            const userId = httpRequest.user.sub

            if (!userId || !password) {
                return badRequest({ message: 'No authentication data.' })
            }

            const reauthenticateUserUseCase = new ReauthenticateAdminUseCase()

            await reauthenticateUserUseCase.execute(userId, password)

            return ok({ message: 'Admin authenticated successfully' })
        } catch (error) {
            if (error instanceof InvalidCredentialsError) {
                return unauthorized({ message: error.message })
            }
            console.log(error)
            return serverError()
        }
    }
}
