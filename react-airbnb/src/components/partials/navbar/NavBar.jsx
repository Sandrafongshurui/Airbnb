import { useState } from 'react'
import {Link} from 'react-router-dom'
import Login from "../../login/Login"
import Register from "../../register/Register"

const NavBar = () => {
    const [openLogin, setOpenLogin] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);
    console.log(openLogin)

    const handleLoginToggle = (value) => {
        setOpenLogin(value)
    }
    const handleRegisterToggle = (value) => {
        setOpenRegister(value)
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <Link to="/" className='navbar-brand'>Animals Shelter</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-link"><Link to="/">Animals</Link></li>
                            <li className="nav-link"><Link to="/register">Register</Link></li>
                            <li className="nav-link"><Link to="/login">Login</Link></li>
                        </ul>
                    
                    </div>
                    <button onClick={() => setOpenLogin(true)}>
                        login
                    </button>
                    <button onClick={() => setOpenRegister(true)}>
                        register
                    </button>
                                        
                </div>
            </nav>
            {openLogin && (<Login toggle={handleLoginToggle}/>)}
            {openRegister && (<Register toggle={handleRegisterToggle}/>)}
        </div>
        
    )
}

export default NavBar