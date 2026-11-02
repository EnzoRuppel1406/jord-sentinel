import { checkIfIdIsValid, invalidResponse, ok, serverError } from '../../shared/helpers/index.js'
import { SummarizeAnalysesByCompanyIdUseCase } from '../use-cases/index.js'

export class SummarizeAnalysesByCompanyIdController {
    async execute(user) {
        try {
            const { companyId } = user

            const companyIdIsValid = checkIfIdIsValid(companyId)

            if (!companyIdIsValid) {
                return invalidResponse()
            }

            const summarizeAnalysesByCompanyIdUseCase = new SummarizeAnalysesByCompanyIdUseCase()

            const summary = await summarizeAnalysesByCompanyIdUseCase.execute(companyId)

            return ok(summary)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
