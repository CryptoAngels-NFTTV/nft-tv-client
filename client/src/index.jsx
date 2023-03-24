import { createRoot } from 'react-dom/client'
import { Auth0Provider } from "@auth0/auth0-react";

import './style.css'
import './styles/playlist.css'
import './styles/earn.css'
import './styles/team.css'
import './styles/footer.css'
import Home from './Home.jsx'


const root = createRoot(document.querySelector('#root'))

root.render(

    <Auth0Provider
        domain="dev-8cfuc6dy5gmdhotp.us.auth0.com"
        clientId="c5x6sPBshNWpA5EcpLf7LsWACpbFhlWa"
        authorizationParams={{
            redirect_uri: window.location.origin
        }}
    >

        <Home />
    </Auth0Provider>
)