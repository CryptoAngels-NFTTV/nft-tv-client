import { useEffect, useState, useRef } from 'react'
import Nft from './Nft.jsx'

export default function Tv() {
    const [nfts] = useState([])
    const [isNetflixVisible, setIsNetflixVisible] = useState(true)
    const netflix = useRef(null)

    const getNfts = async () => {
        const nftsMetada = await fetch('https://api.dawn.watch/api/nftmetada')
        const metadata = await nftsMetada.json()
        // for (let i = 0; i < metadata.nftMetadata.length; i++) {
        for (let i = 0; i < 100; i++) {
            const nftInfo = await JSON.parse(metadata.nftMetadata[i].info)
            const trueMetadata = await JSON.parse(nftInfo.metadata)

            if (trueMetadata != null && trueMetadata.image) {
                const image = fixUrl(trueMetadata.image)
                nfts.push({
                    qrCode: metadata.nftMetadata[i].qrCode.data,
                    name: trueMetadata.name,
                    image: image,
                    description: trueMetadata.description,
                    owner: nftInfo.owner_of
                })
            }
        }

        for (let i = 0; i < nfts.length; i++) {
            try {
                console.log(nfts[i].image)
                const response = await fetch(`http://localhost:3000/image?url=${nfts[i].image}`);
                const data = await response.arrayBuffer();
                nfts[i].image = data;
            } catch (error) {
                nfts[i].image = null;
            }
        }
    }

    const fixUrl = url => {
        if (url.startsWith('ipfs://ipfs')) {
            return 'https://ipfs.io/ipfs/' + url.split('ipfs://ipfs').slice(-1)
        } else if (url.startsWith('ipfs')) {
            return 'https://ipfs.io/ipfs/' + url.split('ipfs://').slice(-1)
        } else if (url.startsWith('ifps')) {
            return 'https://ipfs.io/ipfs/' + url.split('ifps://').slice(-1)
        } else if (url.startsWith('data')) {
            return url
        } else if (url.startsWith('ar')) {
            return 'https://arweave.net/' + url.split('ar://').slice(-1) + '?format-json'
        } else {
            // return url + '?format-json'
            return url
        }
    }

    useEffect(() => {

        setTimeout(() => {
            if (isNetflixVisible)
                netflix.current.className = 'netflix-body fade-out'
        }, 4000)

        setTimeout(() => {
            setIsNetflixVisible(false)
        }, 5500)

        getNfts()

    }, [])

    return <>
        {
            isNetflixVisible ? <div ref={netflix} className='netflix-body fade-in'>
                <h1 className='netflix-title'>
                    NFTTv
                </h1>
            </div>
                :
                <Nft nfts={nfts} />
        }
    </>
}
