import { PostgresClient } from '../../database/postgres/client.js'

export class PostgresGeospatialRepository {
    async findPropertyByCarCode(carCode) {
        const property = await PostgresClient.query(
            `SELECT 
            cod_imovel,
            mod_fiscal,
            num_area,
            ind_status,
            des_condic,
            municipio,
            cod_estado,
            dat_criaca,
            dat_atuali,
            ST_X(
                ST_Transform(
                    ST_Centroid(c.geom), 4326
                )
            ) AS longitude,
            ST_Y(
                ST_Transform(
                    ST_Centroid(c.geom), 4326
                )
            ) AS latitude,
            ST_AsGeoJSON(ST_Transform(c.geom, 4326))::jsonb AS geometry
            FROM geospatial.car_pr c WHERE c.cod_imovel = $1`,
            [carCode]
        )

        return property[0]
    }
}
