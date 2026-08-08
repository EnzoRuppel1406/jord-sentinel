import { GetRoleByNameUseCase } from '../use-cases/index.js'
import { badRequest, ok, serverError, roleNotFoundResponse } from '../../shared/helpers/index.js'

export class GetRoleByNameController {
    async execute(httpRequest) {
        try {
            const roleName = httpRequest.params.roleName

            if (typeof roleName !== 'string' || roleName.trim().length === 0) {
                return badRequest({ message: 'The provided role name is not valid.' })
            }

            const getRoleByNameUseCase = new GetRoleByNameUseCase()

            const role = await getRoleByNameUseCase.execute(roleName)

            if (!role) {
                return roleNotFoundResponse()
            }

            return ok(role)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
