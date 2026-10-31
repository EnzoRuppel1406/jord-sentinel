import {
    EvaluatePropertyRiskUseCase,
    FindPropertyByCarCodeUseCase,
    FindRestrictionsNearPropertyUseCase,
} from './index.js'

export class FindPropertyWithRestrictionsUseCase {
    async execute(carCode) {
        const findPropertyByCarCode = new FindPropertyByCarCodeUseCase()

        const findRestrictionsNearPropertyUseCase = new FindRestrictionsNearPropertyUseCase()

        const evaluatePropertyRiskUseCase = new EvaluatePropertyRiskUseCase()

        const property = await findPropertyByCarCode.execute(carCode)

        if (!property) {
            return null
        }

        const restrictions = await findRestrictionsNearPropertyUseCase.execute(carCode)

        const risk = await evaluatePropertyRiskUseCase.execute(property, restrictions)

        return {
            property,
            restrictions,
            risk,
        }
    }
}
