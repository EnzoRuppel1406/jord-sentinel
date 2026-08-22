import { MapContainer, Polygon, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import AutoFitBounds from '../hooks/AutoFitBounds'
import { useMemo } from 'react'

const AnalisysMap = ({ lat, long, carGeometry, restrictionGeometry, searchTrigger }) => {
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

        return rings.length > 0 ? rings : [geometry]
    }

    const carPositions = useMemo(() => fixPolygons(carGeometry), [carGeometry])
    const restrictionPositions = useMemo(
        () => fixPolygons(restrictionGeometry),
        [restrictionGeometry]
    )

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

            <Polygon pathOptions={{ color: 'yellow' }} positions={carPositions} />
            <Polygon pathOptions={{ color: 'red' }} positions={restrictionPositions} />
        </MapContainer>
    )
}

export default AnalisysMap
