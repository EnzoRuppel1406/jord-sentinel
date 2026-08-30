import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import MapLegend from './MapLegend'

const Map = () => {
    return (
        <MapContainer center={[-24.04583, -52.38278]} zoom={13}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapLegend />
        </MapContainer>
    )
}

export default Map
