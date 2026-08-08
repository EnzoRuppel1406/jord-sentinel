import { DeleteCompanyUseCase } from '../use-cases/index.js'
import { ok, serverError } from '../../shared/helpers/index.js'
import {
    checkIfIdIsValid,
    companyNotFoundResponse,
    invalidResponse,
} from '../../shared/helpers/user.js'

export class DeletecompanyController {
    async execute(httpRequest) {
        try {
            const companyId = httpRequest.params.companyId

            const idisValid = checkIfIdIsValid(companyId)

            if (!idisValid) {
                return invalidResponse()
            }

            const deleteCompanyUseCase = new DeleteCompanyUseCase()

            const deletedCompany = await deleteCompanyUseCase.execute(companyId)

            if (!deletedCompany) {
                return companyNotFoundResponse()
            }

            return ok(deletedCompany)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
