import { useState, useRef, useEffect } from "react"
import { QRCodeSVG } from 'qrcode.react';


export default function Nft({ nfts }) {
    const [nftIndex, setNftIndex] = useState(0);
    const [isClickable, setIsClickable] = useState(true);

    const nftImage = useRef();
    const nftConatainer = useRef();

    useEffect(() => {
        nftConatainer.current.style.opacity = 0;
        nftConatainer.current.className = 'nft-container fade-in';

        setTimeout(() => {
            nftConatainer.current.style.opacity = 1;
        }, 3000);

    }, [])

    const incrementNft = async (event) => {
        setIsClickable(false);
        nftConatainer.current.className = 'nft-container fade-out';


        setTimeout(() => {
            if (nftIndex + 1 >= nfts.length)
                setNftIndex(0)
            else
                setNftIndex(nftIndex + 1);
            nftConatainer.current.className = 'nft-container fade-in';
        }, 1500);

        setTimeout(() => {
            setIsClickable(true);
        }, 4500);


        event.preventDefault();
    }

    return <>
        <div ref={nftConatainer} className="nft-container" onClick={isClickable ? incrementNft : undefined}>
            <img ref={nftImage} src={nfts[nftIndex].image} alt={nfts[nftIndex].name} className="nft-image" />
            <div className="nft-details">
                {nfts[nftIndex].description}
                {/* <img className="nft-qrcode" src={nfts[nftIndex].image} alt={nfts[nftIndex].name} /> */}
                <QRCodeSVG className="nft-qrcode" value={nfts[nftIndex].qrCode} />
            </div>
        </div>
    </>
}