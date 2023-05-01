import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Playlist from "./components/Playlist.jsx";
import Earn from "./components/Earn.jsx";
import Team from "./components/Team.jsx";
import Footer from "./components/Footer.jsx";

export default function Home(){
    return <>
        <section>
            <Header />
            <Hero />
        </section>

        <section>
            <Playlist /> 
        </section>

        <Earn />

        <section>
            <Team />
        </section>
        
        <Footer />

        <video id="video" muted loop autoplay playsInline style={{ display: "none"}}/>
        
    </>
}