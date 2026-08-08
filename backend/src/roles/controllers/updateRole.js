import { UpdateRoleUseCase } from '../use-cases/index.js'
import {
    ok,
    serverError,
    checkIfIdIsValid,
    invalidResponse,
    roleNotFoundResponse,
    someFieldIsBlankResponse,
    someFieldIsNotAllowedResponse,
} from '../../shared/helpers/index.js'

export class UpdateRoleController {
    async execute(httpRequest) {
        try {
            const roleId = httpRequest.params.roleId

            const idIsValid = checkIfIdIsValid(roleId)

            if (!idIsValid) {
                return invalidResponse()
            }

            const params = httpRequest.body

            const allowedFields = ['name', 'description']

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

            const updateRoleUseCase = new UpdateRoleUseCase()

            const updatedRole = await updateRoleUseCase.execute(roleId, params)

            if (!updatedRole) {
                return roleNotFoundResponse()
            }

            return ok(updatedRole)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
