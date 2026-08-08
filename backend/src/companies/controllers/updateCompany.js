import { UpdateCompanyUseCase } from '../use-cases/index.js'
import {
    checkIfIdIsValid,
    companyNotFoundResponse,
    invalidResponse,
    someFieldIsBlankResponse,
    someFieldIsNotAllowedResponse,
    ok,
    serverError,
} from '../../shared/helpers/index.js'

export class UpdateCompanyController {
    async execute(httpRequest) {
        try {
            const companyId = httpRequest.params.companyId

            const idIsValid = checkIfIdIsValid(companyId)

            if (!idIsValid) {
                return invalidResponse()
            }

            const params = httpRequest.body

            const allowedFields = ['name']

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

            const updateCompanyUseCase = new UpdateCompanyUseCase()

            const updatedCompany = await updateCompanyUseCase.execute(companyId, params)

            if (!updatedCompany) {
                return companyNotFoundResponse()
            }

            return ok(updatedCompany)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
