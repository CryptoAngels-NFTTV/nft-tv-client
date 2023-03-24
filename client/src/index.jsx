import { createRoot } from 'react-dom/client'
import './style.css'
import './styles/playlist.css'
import './styles/earn.css'
import './styles/team.css'
import './styles/footer.css'
import Home from './Home.jsx'

const root = createRoot(document.querySelector('#root'))

root.render(
    <Home />
)