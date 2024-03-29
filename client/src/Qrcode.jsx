import { useTexture, useCursor } from "@react-three/drei"
import { useState } from "react"
import * as THREE from 'three'

// export default function Qrcode({ qrcodeImage = "/assets/unknown.png", width, height}) {
export default function Qrcode({ qrcodeImage = "/CryptoAngelsQrCode.jpg", width, height}) {

    const [hovered, setHovered] = useState()

    useCursor(hovered, /*'pointer', 'auto'*/)

    const qrCodeMap = useTexture(qrcodeImage)

    const handleClick = ( e ) =>{
        e.stopPropagation()
        console.log('click')
    }

    return <>
        <mesh
            castShadow
            receiveShadow
            onPointerOver={() => setHovered(true)} 
            onPointerOut={() => setHovered(false)} 
            onClick={handleClick}
            position={[THREE.MathUtils.clamp(width/height * 2, 0.5, 3), -1, 0]}
            // scale={THREE.MathUtils.clamp(width/height, 0.5, 1.25)}
            scale={THREE.MathUtils.clamp(width/height, 0.5, 1.2)}
        >
            <boxGeometry args={[1, 1, 0.05]} />
            <meshStandardMaterial
                    roughness={0.01}
                    metalness={1}
            />
            <mesh  scale={0.95} position-z={0.026}>
                <planeGeometry />
                <meshBasicMaterial map={qrCodeMap ? qrCodeMap : null} />
            </mesh>

        </mesh>


    </>
}