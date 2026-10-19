import { PostgresGeospatialRepository } from '../repositories/geospatial.js'

export class FindPropertyByCarCodeUseCase {
    async execute(carCode) {
        const postgresGeospatialRepository = new PostgresGeospatialRepository()

        const property = await postgresGeospatialRepository.findPropertyByCarCode(carCode)

        if (!property) {
            return null
        }

        const result = {
            code: property.cod_imovel,
            fiscalModules: property.mod_fiscal,
            area: property.num_area,
            status: property.ind_status,
            condition: property.des_condic,
            city: property.municipio,
            state: property.cod_estado,
            createdAt: property.dat_criaca,
            rectifiedAt: property.dat_atuali,
            centroid: { longitude: property.longitude, latitude: property.latitude },
            geometry: property.geometry,
        }

        return result
    }
}
