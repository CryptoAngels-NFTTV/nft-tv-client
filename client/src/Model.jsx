import { useEffect, useRef, useState } from "react";
import { useCursor, Text, useTexture } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from 'three'
import { useThree } from "@react-three/fiber";

import Qrcode from "./Qrcode.jsx";


function NftImage({ nft }) {

    const unknownImage = useTexture('/assets/unknown.png');
    const [texture, setTexture] = useState(null);
    const [map, setMap] = useState(texture);
    const material = useRef();
    const mesh = useRef();

    useEffect(() => {
        if (!nft || nft.image === null) {
            setTexture(unknownImage);
        } else {
            if (nft.extension != "mp4"){
                
                const textureLoader = new THREE.TextureLoader();

                const file = new File([nft.image], `${nft.name}.${nft.extension}`, { type: `image/${nft.extension}` });
                
                const url = URL.createObjectURL(file);

                textureLoader.load(url, (texture2D) => {
                    texture2D.needsUpdate = true;
                    texture2D.encoding = THREE.sRGBEncoding;
                    setTexture(texture2D);
                })
                
            }
            else {
                const video = {};
                const videoTexture = {};

                const file = new File([nft.image], `${nft.name}.${nft.extension}`, { type: `video/${nft.extension}` });

                video[nft.name] = document.createElement("video");
                video[nft.name].src = URL.createObjectURL(file);
                video[nft.name].muted = true
                video[nft.name].playInline = true
                video[nft.name].autoPLay = true
                video[nft.name].loop = true
                video[nft.name].play()

                videoTexture[nft.name] = new THREE.VideoTexture(video[nft.name])

                // videoTexture[nft.name].flipY = true
                videoTexture[nft.name].needsUpdate = true;
                videoTexture[nft.name].minFilter = THREE.NearestFilter
                videoTexture[nft.name].magFilter = THREE.NearestFilter
                videoTexture[nft.name].generateMipmaps = false
                videoTexture[nft.name].encoding = THREE.LinearEncoding

                setTexture(videoTexture[nft.name]);
            }
        }
    }, [nft])

    useEffect(() => {
        if (texture) {
            texture.needsUpdate = true;
            setTimeout(() => {
                setMap(texture)
            }, 500)

        }
    }, [texture])

    /**
     * Handling material encoding for texture
     */
    useEffect(() => {
            mesh.current.material.needsUpdate = true;
    }, [map])

    return <>
        <mesh ref={mesh} position-z={0.026} scale={0.98} >
            <planeGeometry args={[3, 3, 1]} />
            {map && <meshStandardMaterial ref={material} map={map} />}
        </mesh>
    </>
}

function CustomTexts({ nft, width, height }) {
    return <>
        <Text
            maxWidth={1.5}
            anchorX="center"
            anchorY="center"
            textAlign="center"
            position={[THREE.MathUtils.clamp(width / height * 2, 0.5, 3), -1, 0]}
            fontSize={0.1}
            outlineWidth={0.005}
            outlineColor={'#DAB8A8'}
            font={'/fonts/ProximaNovaBold.woff'}
        >
            NFT : {nft ? nft.name : ''}
        </Text>
        {
            nft.description ? <Text
                maxWidth={1.5}
                anchorX="center"
                anchorY="center"
                textAlign="center"
                position={[THREE.MathUtils.clamp(width / height * 2, 0.5, 3), -1.2, 0]}
                fontSize={0.1}
                outlineWidth={0.005}
                outlineColor={'#DAB8A8'}
                font={'/fonts/ProximaNovaBold.woff'}
            >
                Description : {nft.description}
            </Text>
                :
                null
        }
    </>
}

function FullScreen ({width, height, setHovered, wrapper}){
    const [isFullScreen, setIsFullScreen] = useState(false);

    const fullScreen = useTexture('/assets/full-screen.png');

    const mesh = useRef();

    const handleClick = () => {
        if(isFullScreen){
            wrapper.current.classList.remove('full-screen');
            document.body.classList.remove('hide-scroll');
            setIsFullScreen(!isFullScreen);
        } else {
            wrapper.current.classList.add('full-screen');
            document.body.classList.add('hide-scroll');
            setIsFullScreen(!isFullScreen);
        }
    }

    const handleHover = () => {
        setHovered(true)
        const scale = 1.125;
        mesh.current.scale.set(scale, scale, scale);
    }
    
    const handleOut = () =>{
        setHovered(false)
        const scale = 1;
        mesh.current.scale.set(scale, scale, scale);
    }
    return <>
        <mesh
            ref={mesh}
            position={[THREE.MathUtils.clamp(width / height * 2.25, 0.5, 4), -2.5, 0]}
            onPointerOver={handleHover}
            onPointerOut={handleOut}
            onClick={handleClick}
        >
            <planeGeometry args={[0.5, 0.5]} />
            <meshBasicMaterial map={fullScreen} />

        </mesh>
    </>
}

export function Model({ nfts, wrapper }) {

    // state for hovering the NFT card
    const [hovered, setHovered] = useState();
    // index of the nft
    const [index, setIndex] = useState(0);
    // how many second before the FIRST rotation of the NFT card
    const [counter, setCounter] = useState(10);
    // id of the interval, in order to clear it if the user click the nft card
    let intervalId;
    // Get viewport for responsive positioning 
    const { viewport, camera } = useThree()

    // getCurrentViewport is a helper that calculates the size of the viewport
    const { width, height } = viewport.getCurrentViewport(camera, [0, 0, 6])

    useCursor(hovered, /*'pointer', 'auto'*/)

    const nftCard = useRef();

    useEffect(() => {


        intervalId = setInterval(() => {
            setCounter((prevCounter) => prevCounter - 1);
        }, 1000);

        return () => clearInterval(intervalId);


    }, []);

    useEffect(() => {
        if (counter === 0) {
            handleClick()
        }
    }, [counter])

    const handleClick = (e) => {
        e?.stopPropagation()

        if (!gsap.isTweening(nftCard.current.rotation)) {


            if (index + 1 < nfts.length)
                setIndex(index + 1);
            else
                setIndex(0);

            gsap.to(nftCard.current.rotation, {
                y: nftCard.current.rotation.y - Math.PI * 2,
                duration: 2,
                ease: "power3.Out",
            })
            clearInterval(intervalId);
            setCounter(10);
        }
    }

    return (
        <>
            <mesh
                ref={nftCard}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={handleClick}
                position={[-0.75, 0, 0]}
                // scale={THREE.MathUtils.clamp(width / height, 0.5, 1.25)}
                scale={THREE.MathUtils.clamp(width / height, 0.5, 1.5)}
            >
                <boxGeometry args={[3, 3, 0.05]} />
                <meshStandardMaterial
                    roughness={0.01}
                    metalness={1}
                />
                <NftImage nft={nfts[index]} />

            </mesh>

            <Qrcode qrcodeImage={nfts[index] ? nfts[index].qrCode : ''} width={width} height={height} />

            <CustomTexts nft={nfts[index]} width={width} height={height} />
            <FullScreen width={width} height={height} setHovered={setHovered} wrapper={wrapper} />
        </>
    );
}
