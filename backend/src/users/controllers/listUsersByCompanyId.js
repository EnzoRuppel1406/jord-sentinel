import { CompanyNotFoundError } from '../../shared/errors/company.js'
import {
    checkForAdminAccess,
    checkIfIdIsValid,
    companyNotFoundResponse,
    invalidResponse,
    ok,
    serverError,
    unauthorized,
} from '../../shared/helpers/index.js'
import { ListUsersByCompanyIdUseCase } from '../use-cases/index.js'

export class ListUsersByCompanyIdController {
    async execute(user) {
        try {
            const { companyId, roleId } = user

            const companyIdIsValid = checkIfIdIsValid(companyId)
            const roleIdIsValid = checkIfIdIsValid(roleId)

            if (!companyIdIsValid || !roleIdIsValid) {
                return invalidResponse()
            }

            const userHasAccess = await checkForAdminAccess(roleId)

            if (!userHasAccess) {
                return unauthorized({ message: 'User does not have admin access' })
            }

            const listUsersByCompanyIdController = new ListUsersByCompanyIdUseCase()

            const usersList = await listUsersByCompanyIdController.execute(companyId)

            return ok(usersList)
        } catch (error) {
            console.log(error)

            if (error instanceof CompanyNotFoundError) {
                return companyNotFoundResponse()
            }
            return serverError()
        }
    }
}
