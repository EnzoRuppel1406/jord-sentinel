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
            FROM geospatial.car c
            WHERE c.cod_imovel = $1`,
            [carCode]
        )

        return property[0]
    }

    async findIbamaNearProperty(carCode, range) {
        const findings = await PostgresClient.query(
            `
                WITH property AS (
                    SELECT geom
                    FROM geospatial.car c
                    WHERE c.cod_imovel = $1
                )

                SELECT 
                    'Ibama' AS source,
                    i.num_tad,
                    i.municipio,
                    i.uf, i.nome_embar,
                    i.cpf_cnpj_e,
                    i.sit_desmat,
                    i.des_tad,
                    ST_Intersects(i.geom, p.geom) AS overlaps_property,
                    ST_AsGeoJSON(ST_Transform(i.geom, 4326))::jsonb AS geometry,
                    CASE 
                        WHEN ST_Intersects(i.geom, p.geom) THEN
                            ROUND(
                                (
                                    ST_Area(
                                        ST_Transform(
                                            ST_Intersection(i.geom, p.geom),
                                            4326
                                        )::geography
                                    ) / 10000
                                )::numeric,
                                2
                            )
                    END AS overlap_area
                FROM geospatial.ibama i
                CROSS JOIN property p
                WHERE ST_DWithin(
                    i.geom::geography,
                    p.geom::geography,
                    $2 * 1000
                )
            `,
            [carCode, range]
        )

        return findings
    }

    async findConservationUnitNearProperty(carCode, range) {
        const findings = await PostgresClient.query(
            `
                WITH property AS (
                    SELECT geom
                    FROM geospatial.car c
                    WHERE c.cod_imovel = $1
                )

                SELECT
                    'CNUC' AS source,
                    u.uc_id,
                    u.nome_uc,
                    u.cria_ano,
                    u.cria_ato,
                    u.pl_manejo,
                    u.uf,
                    u.municipio,
                    u.org_gestor,
                    ST_Intersects(u.geom, p.geom) AS overlaps_property,
                    ST_AsGeoJSON(ST_Transform(u.geom, 4326))::jsonb AS geometry,
                    CASE 
                        WHEN ST_Intersects(u.geom, p.geom) THEN
                            ROUND(
                                (
                                    ST_Area(
                                        ST_Transform(
                                            ST_Intersection(u.geom, p.geom),
                                            4326
                                        )::geography
                                    ) / 10000
                                )::numeric,
                                2
                            )
                    END AS overlap_area
                FROM geospatial.cnuc u
                CROSS JOIN property p
                WHERE ST_DWithin(
                    u.geom::geography,
                    p.geom::geography,
                    $2 * 1000
                )
            `,
            [carCode, range]
        )

        return findings
    }

    async findIndigenousLandNearProperty(carCode, range) {
        const findings = await PostgresClient.query(
            `
                WITH property AS (
                    SELECT geom
                    FROM geospatial.car c
                    WHERE c.cod_imovel = $1
                )

                SELECT
                    'FUNAI' as source,
                    i.terrai_cod,
                    i.terrai_nom,
                    i.municipio_,
                    i.uf_sigla,
                    i.fase_ti,
                    i.data_atual,
                    ST_Intersects(i.geom, p.geom) AS overlaps_property,
                    ST_AsGeoJSON(ST_Transform(i.geom, 4326))::jsonb AS geometry,
                    CASE 
                        WHEN ST_Intersects(i.geom, p.geom) THEN
                            ROUND(
                                (
                                    ST_Area(
                                        ST_Transform(
                                            ST_Intersection(i.geom, p.geom),
                                            4326
                                        )::geography
                                    ) / 10000
                                )::numeric,
                                2
                            )
                    END AS overlap_area
                FROM geospatial.funai i
                CROSS JOIN property p
                WHERE ST_DWithin(
                    i.geom::geography,
                    p.geom::geography,
                    $2 * 1000
                )
            `,
            [carCode, range]
        )

        return findings
    }

    async findPublicForestNearProperty(carCode, range) {
        const findings = await PostgresClient.query(
            `
                WITH property AS (
                    SELECT geom
                    FROM geospatial.car c
                    WHERE c.cod_imovel = $1
                )

                SELECT
                    'CNFP' AS source,
                    f.codigo,
                    f.nome,
                    f.tipo,
                    f.municipio,
                    f.uf,
                    f.bioma,
                    ST_Intersects(f.geom, p.geom) AS overlaps_property,
                    ST_AsGeoJSON(ST_Transform(f.geom, 4326))::jsonb AS geometry,
                    CASE 
                        WHEN ST_Intersects(f.geom, p.geom) THEN
                            ROUND(
                                (
                                    ST_Area(
                                        ST_Transform(
                                            ST_Intersection(f.geom, p.geom),
                                            4326
                                        )::geography
                                    ) / 10000
                                )::numeric,
                                2
                            )
                    END AS overlap_area
                FROM geospatial.public_forest f
                CROSS JOIN property p
                WHERE ST_DWithin(
                    f.geom::geography,
                    p.geom::geography,
                    $2 * 1000
                )
                AND f.tipo = 'TIPO B'
            `,
            [carCode, range]
        )

        return findings
    }

    async findProdesNearProperty(carCode, range) {
        const findings = await PostgresClient.query(
            `
                WITH property AS (
                    SELECT geom
                    FROM geospatial.car c
                    WHERE c.cod_imovel = $1
                )

                SELECT
                    'PRODES' as source,
                    p.uuid,
                    p.biome,
                    p.state,
                    p.image_date,
                    p.year,
                    ST_Intersects(p.geom, property.geom) AS overlaps_property,
                    ST_AsGeoJSON(ST_Transform(p.geom, 4326))::jsonb AS geometry,
                    CASE 
                        WHEN ST_Intersects(p.geom, property.geom) THEN
                            ROUND(
                                (
                                    ST_Area(
                                        ST_Transform(
                                            ST_Intersection(p.geom, property.geom),
                                            4326
                                        )::geography
                                    ) / 10000
                                )::numeric,
                                2
                            )
                    END AS overlap_area
                FROM geospatial.prodes p
                CROSS JOIN property
                WHERE ST_DWithin(
                    p.geom::geography,
                    property.geom::geography,
                    $2 * 1000
                ) AND p.year >= 2019
            `,
            [carCode, range]
        )

        return findings
    }
}
