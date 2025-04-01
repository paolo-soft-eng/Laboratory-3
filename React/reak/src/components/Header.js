// Header.jsx
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="header-container">
            <header className="header">
                <h1 className="header-h1">Paolo Villanueva</h1>
                
                <div className="menu-toggle" onClick={toggleMenu}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </div>
                
                <nav className={`header-nav ${isMenuOpen ? 'open' : ''}`}>
                    <ul className="header-ul">
                        <li className="nav-item"><a href="#">Home</a></li>
                        <li className="nav-item"><a href="#">About</a></li>
                        <li className="nav-item"><a href="#">Projects</a></li>
                        <li className="nav-item"><a href="#">Services</a></li>
                        <li className="nav-item"><a href="#">Profile</a></li>
                        <li className="nav-item"><a href="#">Logout</a></li>
                    </ul>
                </nav>
            </header>
            <div className="header-spacer"></div>
        </div>
    );
}

export default Header;