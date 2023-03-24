import { useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";



export default function Header(){

    const [isActive, setActive] = useState(false);

    const { loginWithRedirect } = useAuth0();

    const handleToggle = () => {
        setActive(!isActive);
    }
    return <>
        <nav>
            <div className="container-header">
                <div className="split-half">
                    <img className="logo" src="/assets/logo.png" />
                    <h1>Dawn.Watch</h1>
                </div>
                <div className={`menu${isActive ? " is-active" : ""}`}>
                    <a href="#" className="is-active">Tokenomics</a>
                    <a href="#">Roadmap</a>
                    <a href="#">litepaper</a>
                    <a href="#">CryptoAngels</a>
                    <a href="#">NFTTV</a>
                    <div className={`logins${isActive ? " is-active" : ""}`}>
                        <button className="btn-black" onClick={() => loginWithRedirect()}>Log in</button>
                        <button onClick={() => loginWithRedirect()}>Register</button>
                    </div>
                </div>
                <button className={`hamburger${isActive ? " is-active" : ""}`} onClick={handleToggle}>
                    <span />
                    <span />
                    <span />
                </button>
            </div>
        </nav>
    </>
}