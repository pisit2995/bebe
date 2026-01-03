import { useState } from 'react'
import Login from './components/Login'
import Envelope from './components/Envelope'

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const handleLogin = () => {
        setIsAuthenticated(true)
    }

    return (
        <>
            {isAuthenticated ? (
                <Envelope />
            ) : (
                <Login onLogin={handleLogin} />
            )}
        </>
    )
}

export default App
