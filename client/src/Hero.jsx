import Tv from "./Tv";



export default function Hero(){
    return <>
        <div className="hero-wrapper">

            <div className="split">
                <div className="player">
                    <Tv />
                </div>
                <div className="hero">
                    <h1>NFTTV - The largest community of playlists</h1>
                    <p>by Dawn.Watch</p>
                    <div>
                        <button>Register - view to earn</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}