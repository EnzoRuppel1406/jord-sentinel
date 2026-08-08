import { badRequest, ok, serverError } from '../../shared/helpers/index.js'
import { CreateRoleUseCase } from '../use-cases/index.js'

export class CreateRoleController {
    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            const requiredFields = ['name', 'description']

            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return badRequest({ message: `Missing param ${field}` })
                }
            }

            const createRoleUseCase = new CreateRoleUseCase()

            const createdRole = await createRoleUseCase.execute(params)

            return ok(createdRole)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
