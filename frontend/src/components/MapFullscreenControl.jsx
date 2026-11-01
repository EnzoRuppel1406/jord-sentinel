import { useEffect, useRef } from 'react'
import { useMap } from 'react-leaflet'
import { FullScreen } from 'leaflet.fullscreen'
import 'leaflet.fullscreen/dist/Control.FullScreen.css'

const MapFullScreenControl = () => {
    const map = useMap()
    const controlRef = useRef(null)

    useEffect(() => {
        if (!controlRef.current) {
            controlRef.current = new FullScreen({
                position: 'topright',
                title: 'Ver em Tela Cheia',
                titleCancel: 'Sair da Tela Cheia',
                forceSeparateButton: false,
            })
        }

        map.addControl(controlRef.current)

        return () => {
            if (controlRef.current) {
                map.removeControl(controlRef.current)
                controlRef.current = null
            }
        }
    }, [map])

    return null
}

export default MapFullScreenControl
