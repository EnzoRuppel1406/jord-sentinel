import { PostgresGeospatialRepository } from '../repositories/geospatial.js'

export class FindRestrictionsNearPropertyUseCase {
    async execute(carCode) {
        const postgresGeospatialRepository = new PostgresGeospatialRepository()

        const range = 10

        const [ibama, cnuc, funai, cnfp, prodes] = await Promise.all([
            postgresGeospatialRepository.findIbamaNearProperty(carCode, range),
            postgresGeospatialRepository.findConservationUnitNearProperty(carCode, range),
            postgresGeospatialRepository.findIndigenousLandNearProperty(carCode, range),
            postgresGeospatialRepository.findPublicForestNearProperty(carCode, range),
            postgresGeospatialRepository.findProdesNearProperty(carCode, range),
        ])
        const restrictions = {
            ibama,
            cnuc,
            funai,
            cnfp,
            prodes,
        }

        return restrictions
    }
}
