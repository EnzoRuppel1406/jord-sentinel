import { badRequest, ok, serverError, companyNotFoundResponse } from '../../shared/helpers/index.js'
import { GetCompanyByNameUseCase } from '../use-cases/index.js'

export class GetCompanyByNameController {
    async execute(httpRequest) {
        try {
            const companyName = httpRequest.params.companyName

            if (companyName.trim().length === 0 || typeof companyName !== 'string') {
                return badRequest({ message: 'Please provide a valid company name.' })
            }

            const getCompanyByNameUseCase = new GetCompanyByNameUseCase()

            const company = await getCompanyByNameUseCase.execute(companyName)

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
