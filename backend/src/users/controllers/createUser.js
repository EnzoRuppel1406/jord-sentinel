import { ok, badRequest, serverError } from '../../shared/helpers/http.js'
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

            const createUserUseCase = new CreateUserUseCase()

            const createdUser = await createUserUseCase.execute(params)

            return ok(createdUser)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
