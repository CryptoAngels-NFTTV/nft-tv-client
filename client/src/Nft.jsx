
import { OrbitControls, Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControls } from 'leva'
import { Model } from "./Model.jsx";

export default function Nft({ nfts }) {
    return <>
        <Canvas 
            flat
            camera={ {
                fov: 30,
                near: 0.1,
                far: 100,
                position: [ 0, 0, 10 ]
            } }
        >
            <color args={["#000000"]} attach="background" />
            <Environment preset="city"/>

            <OrbitControls />

            <directionalLight position={[1, 2, 3]} intensity={0.5} />

            <Model nfts={nfts} />

        </Canvas>
    </>
}