import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import './Navbar.css';


function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false)
        } else {
            setButton(true);
        } 
    };

    window.addEventListener('resize', showButton);
    // calls the showButton function whenevern window resizes

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo">
                        CMUCal <i class="fa-regular fa-calendar"></i>
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? 'fa-solid fa-x' : 'fa-solid fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        {/* <li className='nav-item'>
                            <Link to='/instructions' className='nav-links' onClick = {closeMobileMenu}>
                                GCal
                            </Link>
                        </li> */}
                        <li className='nav-item'>
                            <Link to='/profile' className='nav-links' onClick = {closeMobileMenu}>
                                <i class="fa-regular fa-user"></i>
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/instructions' className='nav-links' onClick = {closeMobileMenu}>
                                Instructions
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/upload' className='nav-links' onClick = {closeMobileMenu}>
                                Upload
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick = {closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                    </ul>
                    {/* {button && <Button buttonStyle='btn--outline'>Profile</Button>} */}
                </div>
            </nav>
        </>
    )
}

export default Navbar
