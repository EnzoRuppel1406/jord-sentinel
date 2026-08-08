import { GetCompanyByIdUseCase } from '../use-cases/index.js'
import {
    checkIfIdIsValid,
    companyNotFoundResponse,
    invalidResponse,
    ok,
    serverError,
} from '../../shared/helpers/index.js'

export class GetCompanyByIdController {
    async execute(httpRequest) {
        try {
            const companyId = httpRequest.params.companyId

            const idIsValid = checkIfIdIsValid(companyId)

            if (!idIsValid) {
                return invalidResponse()
            }

            const getCompanyByIdUseCase = new GetCompanyByIdUseCase()

            const company = await getCompanyByIdUseCase.execute(companyId)

            if (!company) {
                return companyNotFoundResponse()
            }

            return ok(company)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
