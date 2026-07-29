import { UpdateCompanyUseCase } from '../use-cases/updateCompany.js'
import { badRequest, ok, serverError } from './helpers/http.js'
import { checkIfIdIsValid, invalidResponse } from './helpers/user.js'

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
                return badRequest({
                    message: 'Some provided field is not allowed.',
                })
            }

            const someFieldIsBlank = Object.keys(params).some(
                (field) => params[field].trim().length === 0
            )

            if (someFieldIsBlank) {
                return badRequest({ message: 'Some provided field is blank.' })
            }

            const updateCompanyUseCase = new UpdateCompanyUseCase()

            const updatedCompany = await updateCompanyUseCase.execute(companyId, params)

            return ok(updatedCompany)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
