CREATE INDEX IF NOT EXISTS car_cod_imovel_idx
ON geospatial.car (cod_imovel);

CREATE INDEX IF NOT EXISTS car_geography_idx
ON geospatial.car USING gist ((geom::geography));

CREATE INDEX IF NOT EXISTS cnuc_geography_idx
ON geospatial.cnuc USING gist ((geom::geography));

CREATE INDEX IF NOT EXISTS funai_geography_idx
ON geospatial.funai USING gist ((geom::geography));

CREATE INDEX IF NOT EXISTS ibama_geography_idx
ON geospatial.ibama USING gist ((geom::geography));

CREATE INDEX IF NOT EXISTS public_forest_geography_idx
ON geospatial.public_forest USING gist ((geom::geography));

CREATE INDEX IF NOT EXISTS prodes_geography_idx
ON geospatial.prodes USING gist ((geom::geography));