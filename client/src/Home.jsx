import Header from "./Header.jsx";
import Hero from "./Hero.jsx";
import Playlist from "./Playlist.jsx";
import Earn from "./Earn.jsx";
import Team from "./Team.jsx";
import Footer from "./Footer.jsx";

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
        
    </>
}