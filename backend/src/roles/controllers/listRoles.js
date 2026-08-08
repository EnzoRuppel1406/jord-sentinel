import { ListRolesUseCase } from '../use-cases/index.js'
import { ok, serverError } from '../../shared/helpers/index.js'

export class ListRolesController {
    async execute() {
        try {
            const listRolesUseCase = new ListRolesUseCase()

            const roles = await listRolesUseCase.execute()

            return ok(roles)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
