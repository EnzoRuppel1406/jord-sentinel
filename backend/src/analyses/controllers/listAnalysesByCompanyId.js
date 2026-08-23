import { ok, serverError } from '../../shared/helpers/http.js'
import { checkIfIdIsValid, invalidResponse } from '../../shared/helpers/user.js'
import { ListAnalysesByCompanyIdUseCase } from '../use-cases/index.js'

export class ListAnalysesByCompanyIdController {
    async execute(user) {
        try {
            const { companyId } = user

            const companyIdIsValid = checkIfIdIsValid(companyId)

            if (!companyIdIsValid) {
                return invalidResponse()
            }

            const listAnalysisByCompanyIdUseCase = new ListAnalysesByCompanyIdUseCase()

            const analysesList = await listAnalysisByCompanyIdUseCase.execute(companyId)

            return ok(analysesList)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
