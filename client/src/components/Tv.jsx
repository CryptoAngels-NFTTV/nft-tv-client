import { useEffect, useState, useRef } from 'react'
import * as qrcode from "qrcode";
import fs from 'fs';
// import listReactFiles from 'list-react-files';

import Nft from './Nft.jsx'

// const HandMadeList = [
//     'CRYPTO_ANGELS_AI',
//     'CRYPTO_ANGELS_Aliens',
//     'CRYPTO_ANGELS_Beatles',
//     'CRYPTO_ANGELS_Chemtrails',
//     'CRYPTO_ANGELS_Chickens',
//     'CRYPTO_ANGELS_fitnezz',
//     'CRYPTO_ANGELS_HandOfGod',
//     'CRYPTO_ANGELS_Hipnosis',
//     'CRYPTO_ANGELS_ItsGettingHot',
//     'CRYPTO_ANGELS_Jungle',
//     'CRYPTO_ANGELS_LGTB',
//     'CRYPTO_ANGELS_LittleRedHood',
//     'CRYPTO_ANGELS_Meditation',
//     'CRYPTO_ANGELS_Metaverse',
//     'CRYPTO_ANGELS_Miracle',
//     'CRYPTO_ANGELS_MoneyMakers',
//     'CRYPTO_ANGELS_NoahsArk',
//     'CRYPTO_ANGELS_NoWAR',
//     'CRYPTO_ANGELS_PacMan',
//     'CRYPTO_ANGELS_Pandemic',
//     'CRYPTO_ANGELS_Press',
//     'CRYPTO_ANGELS_Pyramid',
//     'CRYPTO_ANGELS_Rave',
//     'CRYPTO_ANGELS_RedSea',
//     'CRYPTO_ANGELS_Smoke',
//     'CRYPTO_ANGELS_Starship',
//     'CRYPTO_ANGELS_Surfers',
//     'CRYPTO_ANGELS_Traffic',
//     'CRYPTO_ANGELS_UnderWater',
//     'CRYPTO_ANGELS_Wood'
// ]

const HandMadeList = [
    {
        file: 'CRYPTO_ANGELS_AI',
        name: 'We are watching',
        description: 'the new unescapable',
    },
    {
        file: 'CRYPTO_ANGELS_Aliens',
        name: 'Odyssey',
        description: 'We come in peace'
    },
    {
        file: 'CRYPTO_ANGELS_Beatles',
        name: 'Timeless',
        description: 'Deserves its place in the blockchain'
    },
    {
        file: 'CRYPTO_ANGELS_Chemtrails',
        name: 'Smog is in the air',
        description: 'Can\'t breath'
    },
    {
        file: 'CRYPTO_ANGELS_Chickens',
        name: 'Bio-tweaking',
        description: 'Now calling for genetic therapy'
    },
    {
        file: 'CRYPTO_ANGELS_fitnezz',
        name: 'Gym selfies',
        description: 'No comment'
    },
    {
        file: 'CRYPTO_ANGELS_HandOfGod',
        name: 'Hand of God',
        description: 'What is fairplay next to genious?'
    },
    {
        file: 'CRYPTO_ANGELS_Hipnosis',
        name: 'Hypnosis',
        description: 'Spiral of life'
    },
    {
        file: 'CRYPTO_ANGELS_ItsGettingHot',
        name: 'It\'s getting hot in here',
        description: 'Got some ice ?'
    },
    {
        file: 'CRYPTO_ANGELS_Jungle',
        name: 'Ayahuasca',
        description: 'Tucano wisdom. Who is your forest guide ?'
    },
    {
        file: 'CRYPTO_ANGELS_LGTB',
        name: 'Boundless Love',
        description: 'Be yourself'
    },
    {
        file: 'CRYPTO_ANGELS_LittleRedHood',
        name: 'Coin basket',
        description: 'What\'s in yours ?'
    },
    {
        file: 'CRYPTO_ANGELS_Meditation',
        name: 'Pump distraction',
        description: 'Samadhi breach'
    },
    {
        file: 'CRYPTO_ANGELS_Metaverse',
        name: 'Metaverse',
        description: 'The Future, apparently'
    },
    {
        file: 'CRYPTO_ANGELS_Miracle',
        name: 'History re-written',
        description: 'According to unreliable sources'
    },
    {
        file: 'CRYPTO_ANGELS_MoneyMakers',
        name: 'Are we good on ink ?',
        description: 'Two generations of debt are working on that'
    },
    {
        file: 'CRYPTO_ANGELS_NoahsArk',
        name: 'Crypto Ark',
        description: 'no Fiat onboard'
    },
    {
        file: 'CRYPTO_ANGELS_NoWAR',
        name: 'No War',
        description: 'we need each other more than ever'
    },
    {
        file: 'CRYPTO_ANGELS_PacMan',
        name: 'Governance to the people',
        description: 'Strong winds of hopeium'
    },
    {
        file: 'CRYPTO_ANGELS_Pandemic',
        name: 'Rona times',
        description: 'new rules'
    },
    {
        file: 'CRYPTO_ANGELS_Press',
        name: 'Don\'t look down',
        description: 'Not under our watch'
    },
    {
        file: 'CRYPTO_ANGELS_Pyramid',
        name: 'Pancho Villa UFO',
        description: 'Mexican History 101'
    },
    {
        file: 'CRYPTO_ANGELS_Rave',
        name: 'Party time',
        description: 'share the love'
    },
    {
        file: 'CRYPTO_ANGELS_RedSea',
        name: 'Open Seas',
        description: 'this way folks !'
    },
    {
        file: 'CRYPTO_ANGELS_Smoke',
        name: 'Buy High Sell High',
        description: 'Not an investment recomendation !'
    },
    {
        file: 'CRYPTO_ANGELS_Starship',
        name: 'Cross-chain voage',
        description: 'Are we human or are we collector ?'
    },
    {
        file: 'CRYPTO_ANGELS_Surfers',
        name: 'The GOAT',
        description: 'Always a YoungGun'
    },
    {
        file: 'CRYPTO_ANGELS_Traffic',
        name: 'name',
        description: 'description'
    },
    {
        file: 'CRYPTO_ANGELS_UnderWater',
        name: 'Aquatic life',
        description: 'Bombs, fish and garbage. Where\'s my phone ?'
    },
    {
        file: 'CRYPTO_ANGELS_Wood',
        name: 'Wishful thinking',
        description: 'when UFOs take over'
    },
]

export default function Tv() {
    const [nfts] = useState([])
    const [isNetflixVisible, setIsNetflixVisible] = useState(true)
    const netflix = useRef(null)

    const nftsWrapper = useRef()

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
        while (pageIndex <= totalPages) {
            /**
             * variables in order to handle calling proxyserver dynamicly
             */
            let firstIndex = size * (pageIndex - 1);
            let lastIndex = size * pageIndex;

            /**
             *  if we are in the last page we take only the size that is last we don't take 10 (for example if we have 41 elements, in the last page we take only a size of 1)
             * Fixing the lastIndex variable in order to take full length of elements
             * */
            if (pageIndex === totalPages) {
                lastIndex = totalElements;
                size = totalElements % (size * (pageIndex - 1));
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
                    if (extension.includes("gif"))
                        extension = "gif"
                    else if (extension.includes("ipfs"))
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

            for (let i = firstIndex; i < lastIndex; i++) {
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
                try {
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

    const getHandMade = () =>{
        HandMadeList.map(item=>{
            nfts.push({
                name: item.name,
                image: `/HandMade/${item.file}.mp4`,
                extension: 'mp4',
                description: item.description,
                owner: null
            })
        })


    }

    useEffect(() => {
        // getNfts()
        getHandMade()

        setTimeout(() => {
            if (isNetflixVisible)
                netflix.current.className = 'netflix-body fade-out'
        }, 4000)

        setTimeout(() => {
            setIsNetflixVisible(false)
        }, 5500)

    }, [])

    return <>
        <div className="nfts" ref={nftsWrapper}>

            {
                isNetflixVisible ? <div ref={netflix} className='netflix-body fade-in'>
                    <h1 className='netflix-title'>
                        NFTTv
                    </h1>
                </div>
                    :
                    nfts.length > 0 ? <Nft nfts={nfts} wrapper={nftsWrapper} /> : null
            }
        </div>
    </>
}
