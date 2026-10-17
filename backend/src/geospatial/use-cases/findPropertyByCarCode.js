import { PostgresGeospatialRepository } from '../repositories/geospatial.js'

export class FindPropertyByCarCodeUseCase {
    async execute(carCode) {
        const postgresGeospatialRepository = new PostgresGeospatialRepository()

        const property = await postgresGeospatialRepository.findPropertyByCarCode(carCode)

        return property
    }
}
