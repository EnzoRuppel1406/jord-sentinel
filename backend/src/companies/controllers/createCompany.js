import { CreateCompanyUseCase } from '../use-cases/index.js'
import { badRequest, ok, serverError } from '../../shared/helpers/index.js'

export class CreateCompanyController {
    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            const requiredFields = ['name']

            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return badRequest({ message: `Missing param ${field}` })
                }
            }

            const createCompanyUseCase = new CreateCompanyUseCase()

            const createdCompany = await createCompanyUseCase.execute(params)

            return ok(createdCompany)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
