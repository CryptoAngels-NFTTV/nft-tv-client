import { useEffect, useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";



export default function Header() {

    const [isActive, setActive] = useState(false);

    const { user, isAuthenticated, getAccessTokenSilently, loginWithRedirect } = useAuth0();
    const [userMetadata, setUserMetadata] = useState(null);


    useEffect(() => {
        const getUserMetadata = async () => {
            const domain = "dev-8cfuc6dy5gmdhotp.us.auth0.com";

            try {
                const accessToken = await getAccessTokenSilently({
                    authorizationParams: {
                        audience: `https://${domain}/api/v2/`,
                        scope: "read:current_user",
                    },
                });

                const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

                const metadataResponse = await fetch(userDetailsByIdUrl, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const { user_metadata } = await metadataResponse.json();

                setUserMetadata(user_metadata);
            } catch (e) {
                console.log(e.message);
            }
        };

        getUserMetadata();
    }, [getAccessTokenSilently, user?.sub]);

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