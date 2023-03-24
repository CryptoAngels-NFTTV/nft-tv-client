
import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Model } from "../Model.jsx";

export default function Nft({ nfts, wrapper }) {
    return <>
        <Canvas
            flat
            camera={{
                fov: 30,
                near: 0.1,
                far: 100,
                position: [0, 0, 10]
            }}
        >
            {/* <color args={["#000000"]} attach="background" /> */}
            <Environment preset="city" />

            <directionalLight position={[1, 2, 3]} intensity={0.5} />

            <Model nfts={nfts} wrapper={wrapper} />

        </Canvas>
    </>
}