import { MapContainer, Polygon, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import AutoFitBounds from '../hooks/AutoFitBounds'
import { useMemo } from 'react'
import MapLegend from './MapLegend'

const AnalisysMap = ({ lat, long, carGeometry, restrictions = [], searchTrigger }) => {
    const fixPolygons = (geometry) => {
        if (!geometry || !Array.isArray(geometry) || geometry.length === 0) return []

        const rings = []
        let currentRing = []

        geometry.forEach((point) => {
            currentRing.push(point)

            if (
                currentRing.length > 3 &&
                point[0] === currentRing[0][0] &&
                point[1] === currentRing[0][1]
            ) {
                rings.push(currentRing)
                currentRing = []
            }
        })

        const swapCoordinates = (coordinates) => {
            if (!Array.isArray(coordinates)) return coordinates

            if (typeof coordinates[0] === 'number' && typeof coordinates[1] === 'number') {
                return [coordinates[1], coordinates[0], ...coordinates.slice(2)]
            }

            return coordinates.map(swapCoordinates)
        }

        const polygons = rings.length > 0 ? rings : [geometry]

        return swapCoordinates(polygons)
    }

    const carPositions = useMemo(() => fixPolygons(carGeometry), [carGeometry])
    const restrictionPositions = useMemo(() => {
        if (!Array.isArray(restrictions)) return []
        return restrictions.map((restriction) => {
            const coords = restriction?.geometry?.coordinates
            return fixPolygons(coords)
        })
    }, [restrictions])

    const rescritionColors = {
        'Terra Indígena': '#7203AD',
        'Unidade de Conservação': '#13077D',
        'Embargo Ibama': '#9E0202',
        'Floresta Pública': '#59FA48',
        Quilombo: '#380E00',
        PRODES: '#ddd',
    }

    return (
        <MapContainer center={[lat || -24.04583, long || -52.38278]} zoom={15}>
            <TileLayer
                attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />

            <AutoFitBounds
                carPositions={carPositions}
                restrictionPositions={restrictionPositions}
                searchTrigger={searchTrigger}
                lat={lat}
                long={long}
            />

            <Polygon pathOptions={{ color: '#FFEB4F' }} positions={carPositions} />
            {restrictionPositions.map((positions, index) => (
                <Polygon
                    key={restrictions[index]?.id || index}
                    pathOptions={{ color: rescritionColors[restrictions[index].type] }}
                    positions={positions}
                />
            ))}

            <MapLegend />
        </MapContainer>
    )
}

export default AnalisysMap
