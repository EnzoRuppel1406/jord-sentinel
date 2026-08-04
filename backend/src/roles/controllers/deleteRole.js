import { ok, serverError } from '../../shared/helpers/http.js'
import {
    checkIfIdIsValid,
    invalidResponse,
    roleNotFoundResponse,
} from '../../shared/helpers/user.js'
import { DeleteRoleUseCase } from '../use-cases/index.js'

export class DeleteRoleController {
    async execute(httpRequest) {
        try {
            const roleId = httpRequest.params.roleId

            const idIsValid = checkIfIdIsValid(roleId)

            if (!idIsValid) {
                return invalidResponse()
            }

            const deleteRoleUseCase = new DeleteRoleUseCase()

            const deletedRole = await deleteRoleUseCase.execute(roleId)

            if (!deletedRole) {
                return roleNotFoundResponse()
            }

            return ok(deletedRole)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
