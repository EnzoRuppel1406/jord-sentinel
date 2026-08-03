import { ok, serverError } from '../../shared/helpers/http.js'
import {
    checkIfIdIsValid,
    invalidResponse,
    roleNotFoundResponse,
} from '../../shared/helpers/user.js'
import { GetRoleByIdUseCase } from '../use-cases/index.js'

export class GetRoleByIdController {
    async execute(httpRequest) {
        try {
            const roleId = httpRequest.params.roleId

            const idIsValid = checkIfIdIsValid(roleId)

            if (!idIsValid) {
                return invalidResponse()
            }

            const getRoleByIdUseCase = new GetRoleByIdUseCase()

            const role = await getRoleByIdUseCase.execute(roleId)

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
