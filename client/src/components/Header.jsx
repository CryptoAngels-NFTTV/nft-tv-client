import { useState } from "react";



export default function Header(){

    const [isActive, setActive] = useState(false);

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
                        <button className="btn-black">Log in</button>
                        <button>Register</button>
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