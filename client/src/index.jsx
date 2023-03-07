import { createRoot } from 'react-dom/client'
import './style.css'
import './playlist.css'
import './earn.css'
import './team.css'
import Home from './Home.jsx'
import Tv from './Tv.jsx'

const root = createRoot(document.querySelector('#root'))

root.render(
    // <Tv />
    <Home />
)