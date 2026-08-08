import { ok, serverError } from '../../shared/helpers/index.js'
import { ListCompaniesUseCase } from '../use-cases/listCompanies.js'

export class ListCompaniesController {
    async execute() {
        try {
            const listCompaniesUseCase = new ListCompaniesUseCase()

            const companies = await listCompaniesUseCase.execute()

            return ok(companies)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
