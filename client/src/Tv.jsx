import { useEffect, useState, useRef } from 'react'
import * as qrcode from "qrcode"; 
import Nft from './Nft.jsx'

export default function Tv() {
    const [nfts] = useState([])
    const [isNetflixVisible, setIsNetflixVisible] = useState(true)
    const netflix = useRef(null)

    const getNfts = async () => {
        // first call to get the infos from api (how many elements is there, how many pages is there)
        const nftsMetada = await fetch('https://api.dawn.watch/api/nftmetada/filter?page=1&size=10')
        const metadata = await nftsMetada.json()
        const totalElements = metadata.totalElements;
        const totalPages = metadata.totalPages;
        // initiate the first page and a size of 10 element by page
        let pageIndex = 1;
        let size = 10;

        // while we didn't get to the last page we inject nft in our nfts object
        while(pageIndex <= totalPages){
            /**
             * variables in order to handle calling proxyserver dynamicly
             */
            let firstIndex = size * (pageIndex - 1);
            let lastIndex = size * pageIndex;

            /**
             *  if we are in the last page we take only the size that is last we don't take 10 (for example if we have 41 elements, in the last page we take only a size of 1)
             * Fixing the lastIndex variable in order to take full length of elements
             * */ 
            if(pageIndex === totalPages){
                lastIndex = totalElements;
                size =  totalElements % (size * (pageIndex - 1) );
            }

            // injecting in the nfts object
            const nftsMetada = await fetch(`https://api.dawn.watch/api/nftmetada/filter?page=${pageIndex}&size=${size}`);
            const metadata = await nftsMetada.json()

            for (let i = 0; i < metadata.content.length; i++) {
                const nftInfo = await JSON.parse(metadata.content[i].info)
                const trueMetadata = await JSON.parse(nftInfo.metadata)
    
                if (trueMetadata != null && trueMetadata.image) {
                    const image = fixUrl(trueMetadata.image)
                    let extension = image.split('.').pop();
                    if(extension.includes("gif"))
                        extension = "gif"
                    else if(extension.includes("ipfs"))
                        extension = "jpg"
                    nfts.push({
                        qrCode: metadata.content[i].qrCode.data,
                        name: trueMetadata.name,
                        image: image,
                        extension: extension,
                        description: trueMetadata.description,
                        owner: nftInfo.owner_of
                    })
                }
            }
            /**
             * Creating another loop in order to give the props to children, then make update to it with the "awaits"
             * So we don't have to wait all the fetchs
             */
            
            for(let i = firstIndex; i < lastIndex; i++){
                /**
                 * Handle QrCode in order to transform text to image
                 */
                const image = await qrcode.toDataURL(nfts[i].qrCode);
                nfts[i].qrCode = image;
    
                /**
                 * Handle NFT's images
                 */
                //added a timeout 
                const controller = new AbortController()
                const timeoutId = setTimeout(() => controller.abort(), 10000)
                try{
                    const response = await fetch(`https://www.dawn.watch:444/image?url=${nfts[i].image}`, { signal: controller.signal });
                    const data = await response.arrayBuffer();
                    nfts[i].image = data;
                } catch (error) {
                    nfts[i].image = null;
                }
            }
            // incrementing the page index 
            pageIndex++;
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
            return url
        }
    }

    useEffect(() => {
        getNfts()

        setTimeout(() => {
            if (isNetflixVisible)
                netflix.current.className = 'netflix-body fade-out'
        }, 4000)

        setTimeout(() => {
            setIsNetflixVisible(false)
        }, 5500)

    }, [])

    return <>
        {
            isNetflixVisible ? <div ref={netflix} className='netflix-body fade-in'>
                <h1 className='netflix-title'>
                    NFTTv
                </h1>
            </div>
                :
                nfts.length > 0 ? <Nft nfts={nfts} /> : null
            }
    </>
}
