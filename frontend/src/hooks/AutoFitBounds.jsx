import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'

const AutoFitBounds = ({ carPositions, restrictionPositions, searchTrigger, lat, long }) => {
    const map = useMap()

    useEffect(() => {
        const allPoints = [...carPositions, ...restrictionPositions]

        if (allPoints.length > 0) {
            const bounds = L.latLngBounds(allPoints)

            if (bounds.isValid()) {
                map.setView([lat, long], map.getZoom(), { animate: false })

                map.fitBounds(bounds, { padding: [30, 30], animate: true })
            }
        }
    }, [carPositions, restrictionPositions, map, searchTrigger])

    return null
}

export default AutoFitBounds
