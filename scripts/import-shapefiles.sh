#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_ROOT"

REPLACE_EXISTING=false
if [ "$#" -gt 1 ] || { [ "$#" -eq 1 ] && [ "$1" != "--replace" ]; }; then
    echo "Usage: bash scripts/import-shapefiles.sh [--replace]" >&2
    exit 2
fi
if [ "$#" -eq 1 ]; then REPLACE_EXISTING=true; fi

if [ ! -d "$PROJECT_ROOT/data/shapefiles" ]; then
    echo "Missing data/shapefiles. Download and extract the datasets first." >&2
    exit 1
fi
command -v docker >/dev/null 2>&1 || { echo "Docker is required." >&2; exit 1; }

docker compose up -d postgres
ready=false
for attempt in $(seq 1 60); do
    if docker compose exec -T postgres bash -c 'pg_isready -U "$POSTGRES_USER" -d "$POSTGRES_DB"' >/dev/null 2>&1; then
        ready=true
        break
    fi
    sleep 2
done
if [ "$ready" != true ]; then
    echo "PostgreSQL did not become ready within 120 seconds." >&2
    exit 1
fi

docker compose exec -T postgres bash -s -- "$REPLACE_EXISTING" <<'CONTAINER_SCRIPT'
set -euo pipefail
REPLACE_EXISTING="$1"
DATA_DIR=/data/shapefiles

die() { echo "ERROR: $*" >&2; exit 1; }

find_one_shapefile() {
    local directory="$1"
    local -a files=()
    [ -d "$directory" ] || die "Missing folder: $directory"
    mapfile -d '' files < <(find "$directory" -maxdepth 1 -type f -iname '*.shp' -print0 | sort -z)
    if [ "${#files[@]}" -ne 1 ]; then
        die "Expected exactly one .shp in $directory; found ${#files[@]}."
    fi
    printf '%s' "${files[0]}"
}

find_prodes_shapefile() {
    local prefix="$1"
    local -a files=()
    mapfile -d '' files < <(find "$DATA_DIR/prodes" -type f -iname "${prefix}*.shp" -print0 | sort -z)
    if [ "${#files[@]}" -ne 1 ]; then
        die "Expected one PRODES shapefile beginning with $prefix; found ${#files[@]}."
    fi
    printf '%s' "${files[0]}"
}

declare -a car_files=()
car_states=(AC AL AM AP BA CE DF ES GO MA MG MS MT PA PB PE PI PR RJ RN RO RR RS SC SE SP TO)
for state in "${car_states[@]}"; do
    car_files+=("$(find_one_shapefile "$DATA_DIR/car/AREA_IMOVEL_$state")")
done

cnuc_file="$(find_one_shapefile "$DATA_DIR/cnuc")"
funai_file="$(find_one_shapefile "$DATA_DIR/funai")"
ibama_file="$(find_one_shapefile "$DATA_DIR/ibama")"
public_forest_file="$(find_one_shapefile "$DATA_DIR/public_forest")"
quilombo_file="$(find_one_shapefile "$DATA_DIR/quilombo")"

# Amazonia Legal has the superset of PRODES fields (including sub_class and pub_date), so it creates the unified table first.
prodes_amazonia_legal="$(find_prodes_shapefile yearly_deforestation_amazonia_legal)"
prodes_cerrado="$(find_prodes_shapefile yearly_deforestation_biome_cerrado)"
prodes_pampa="$(find_prodes_shapefile yearly_deforestation_biome_pampa)"
prodes_pantanal="$(find_prodes_shapefile yearly_deforestation_biome_pantanal)"
prodes_amazonia="$(find_prodes_shapefile yearly_deforestation_biome_amazonia)"
prodes_mata_atlantica="$(find_prodes_shapefile yearly_deforestation_biome_mata_atlantica)"
prodes_caatinga="$(find_prodes_shapefile yearly_deforestation_biome_caatinga)"

psql -X -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" -d "$POSTGRES_DB" <<'SQL'
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE SCHEMA IF NOT EXISTS geospatial;
SQL

existing_tables="$(psql -X -At -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "
    SELECT string_agg(tablename, ', ' ORDER BY tablename)
    FROM pg_tables
    WHERE schemaname = 'geospatial'
      AND tablename = ANY (ARRAY[
          'car', 'cnuc', 'funai', 'ibama', 'public_forest', 'quilombo', 'prodes'
      ]);
")"

if [ -n "$existing_tables" ]; then
    if [ "$REPLACE_EXISTING" != true ]; then
        die "Tables already exist ($existing_tables). Use --replace to delete and reload them."
    fi
    echo "Deleting existing geospatial tables as requested by --replace."
    psql -X -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" -d "$POSTGRES_DB" <<'SQL'
DROP TABLE IF EXISTS
    geospatial.car, geospatial.cnuc, geospatial.funai, geospatial.ibama,
    geospatial.public_forest, geospatial.quilombo, geospatial.prodes
CASCADE;
SQL
fi

import_shape() {
    local mode="$1"
    local shape="$2"
    local table="$3"
    local encoding="${4:-UTF-8}"

    echo "Importing $(basename "$shape") into geospatial.$table"

    shp2pgsql -W "$encoding" -D "$mode" -s 4674 "$shape" "geospatial.$table" |
        psql -X -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" -d "$POSTGRES_DB"
}

first_car=true
for shape in "${car_files[@]}"; do
    if [ "$first_car" = true ]; then
        import_shape -c "$shape" car
        first_car=false
    else
        import_shape -a "$shape" car
    fi
done

import_shape -c "$cnuc_file" cnuc
import_shape -c "$funai_file" funai LATIN1
import_shape -c "$ibama_file" ibama
import_shape -c "$public_forest_file" public_forest
import_shape -c "$quilombo_file" quilombo

import_prodes_shape() {
    local shape="$1"
    local biome="$2"
    local mode="$3"
    import_shape "$mode" "$shape" prodes

    if [ "$mode" = "-c" ]; then
        psql -X -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" -d "$POSTGRES_DB" <<'SQL'
ALTER TABLE geospatial.prodes ADD COLUMN IF NOT EXISTS biome TEXT;
ALTER TABLE geospatial.prodes
    ALTER COLUMN state TYPE TEXT,
    ALTER COLUMN path_row TYPE TEXT,
    ALTER COLUMN main_class TYPE TEXT,
    ALTER COLUMN class_name TYPE TEXT,
    ALTER COLUMN sub_class TYPE TEXT,
    ALTER COLUMN source TYPE TEXT,
    ALTER COLUMN satellite TYPE TEXT,
    ALTER COLUMN sensor TYPE TEXT,
    ALTER COLUMN uuid TYPE TEXT,
    ALTER COLUMN pub_date TYPE TEXT;
SQL
    fi
    psql -X -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" -d "$POSTGRES_DB" \
        -c "UPDATE geospatial.prodes SET biome = '$biome' WHERE biome IS NULL;"
}

# Amazonia Legal is a region, not a biome; its separate label keeps that source identifiable.
import_prodes_shape "$prodes_amazonia_legal" "Amazonia Legal" "-c"
import_prodes_shape "$prodes_cerrado" "Cerrado" "-a"
import_prodes_shape "$prodes_pampa" "Pampa" "-a"
import_prodes_shape "$prodes_pantanal" "Pantanal" "-a"
import_prodes_shape "$prodes_amazonia" "Amazonia" "-a"
import_prodes_shape "$prodes_mata_atlantica" "Mata Atlantica" "-a"
import_prodes_shape "$prodes_caatinga" "Caatinga" "-a"

echo "Creating spatial indexes and refreshing PostgreSQL statistics."
psql -X -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" -d "$POSTGRES_DB" <<'SQL'
CREATE INDEX IF NOT EXISTS car_geom_idx ON geospatial.car USING gist (geom);
CREATE INDEX IF NOT EXISTS cnuc_geom_idx ON geospatial.cnuc USING gist (geom);
CREATE INDEX IF NOT EXISTS funai_geom_idx ON geospatial.funai USING gist (geom);
CREATE INDEX IF NOT EXISTS ibama_geom_idx ON geospatial.ibama USING gist (geom);
CREATE INDEX IF NOT EXISTS public_forest_geom_idx ON geospatial.public_forest USING gist (geom);
CREATE INDEX IF NOT EXISTS quilombo_geom_idx ON geospatial.quilombo USING gist (geom);
CREATE INDEX IF NOT EXISTS prodes_geom_idx ON geospatial.prodes USING gist (geom);

CREATE INDEX IF NOT EXISTS car_cod_imovel_idx ON geospatial.car (cod_imovel);
CREATE INDEX IF NOT EXISTS car_geography_idx ON geospatial.car USING gist ((geom::geography));
CREATE INDEX IF NOT EXISTS cnuc_geography_idx ON geospatial.cnuc USING gist ((geom::geography));
CREATE INDEX IF NOT EXISTS funai_geography_idx ON geospatial.funai USING gist ((geom::geography));
CREATE INDEX IF NOT EXISTS ibama_geography_idx ON geospatial.ibama USING gist ((geom::geography));
CREATE INDEX IF NOT EXISTS public_forest_geography_idx ON geospatial.public_forest USING gist ((geom::geography));
CREATE INDEX IF NOT EXISTS quilombo_geography_idx ON geospatial.quilombo USING gist ((geom::geography));
CREATE INDEX IF NOT EXISTS prodes_geography_idx ON geospatial.prodes USING gist ((geom::geography));

ANALYZE geospatial.car;
ANALYZE geospatial.cnuc;
ANALYZE geospatial.funai;
ANALYZE geospatial.ibama;
ANALYZE geospatial.public_forest;
ANALYZE geospatial.quilombo;
ANALYZE geospatial.prodes;
SQL

echo "Geospatial import completed."
echo "Next run: npm run migrate"
CONTAINER_SCRIPT

