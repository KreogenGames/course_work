import React from 'react';
import colorLogo from '../images/es_logo.png'


const Nav = ({authToken, setShowModal, showModal, setIsSignUp}) => {

    const handleClick = () => {
        setShowModal(true)
        setIsSignUp(false)
    }

    return (
        <nav>
            <div className="logo-container">
                <img className="logo" src={colorLogo}/>
            </div>

            {!authToken && <button
                className="nav-button"
                onClick={handleClick}
                disabled={showModal}
            >Log In</button>}
        </nav>
    );
};

export default Nav;