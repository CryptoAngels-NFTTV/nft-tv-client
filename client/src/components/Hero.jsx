import Tv from "./Tv";



export default function Hero(){
    return <>
        <div className="hero-wrapper">

            <div className="split">
                <div className="player">
                    <Tv />
                </div>
                <div className="hero">
                    <div>
                        <h1 className="hero__title">NFTTV</h1>
                        <h2 className="hero__subtitle">NFT Playlists for all</h2>
                    </div>
                    <p className="hero__text">by Dawn.Watch</p>
                    <div>
                        <button>Build you NFT playlist</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}