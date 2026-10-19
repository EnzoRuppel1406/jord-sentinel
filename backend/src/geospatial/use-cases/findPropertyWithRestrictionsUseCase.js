import { FindPropertyByCarCodeUseCase, FindRestrictionsNearPropertyUseCase } from './index.js'

export class FindPropertyWithRestrictionsUseCase {
    async execute(carCode) {
        const findPropertyByCarCode = new FindPropertyByCarCodeUseCase()

        const findRestrictionsNearPropertyUseCase = new FindRestrictionsNearPropertyUseCase()

        const property = await findPropertyByCarCode.execute(carCode)

        if (!property) {
            return null
        }

        const restrictions = await findRestrictionsNearPropertyUseCase.execute(carCode)

        return {
            property: property,
            restrictions,
        }
    }
}
