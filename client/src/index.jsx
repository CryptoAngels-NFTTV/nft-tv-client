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


    // https://dev-8cfuc6dy5gmdhotp.us.auth0.com/authorize?audience=https://api.dawn.watch/api/actuator/health&scope=openid%20profile%20email&response_type=code&client_id=c5x6sPBshNWpA5EcpLf7LsWACpbFhlWa&state=abcd12313&redirect_uri=https://www.dawn.watch

    <Auth0Provider
        domain="dev-8cfuc6dy5gmdhotp.us.auth0.com"
        clientId="c5x6sPBshNWpA5EcpLf7LsWACpbFhlWa"        
        authorizationParams={{
            redirect_uri: window.location.origin, 
            audience: "https://api.dawn.watch/api/actuator/health",
            scope: "openid%20profile%20email",
        }}
    >

        <Home />
    </Auth0Provider>
)