import { FindRestrictionsNearPropertyUseCase } from '../use-cases/index.js'
import { ok, serverError } from '../../shared/helpers/index.js'

export class FindRestrictionsNearPropertyController {
    async execute(httpRequest) {
        try {
            const carCode = httpRequest.params.carCode

            const findRestrictionsNearPropertyUseCase = new FindRestrictionsNearPropertyUseCase()

            const restrictions = await findRestrictionsNearPropertyUseCase.execute(carCode)

            return ok(restrictions)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
