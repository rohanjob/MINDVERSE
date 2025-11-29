import React, { useState, useEffect } from 'react';

const Navigation = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className={`divine-navigation ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-content">
                <a href="#home" className="nav-logo" onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('home');
                }}>
                    <span className="nav-aum">ॐ</span>
                    <span>MindVerse</span>
                </a>

                <ul className="nav-menu">
                    <li>
                        <a href="#home" className="nav-link" onClick={(e) => {
                            e.preventDefault();
                            scrollToSection('home');
                        }}>Home</a>
                    </li>
                    <li>
                        <a href="#stories" className="nav-link" onClick={(e) => {
                            e.preventDefault();
                            scrollToSection('stories');
                        }}>Stories</a>
                    </li>
                    <li>
                        <a href="#temples" className="nav-link" onClick={(e) => {
                            e.preventDefault();
                            scrollToSection('temples');
                        }}>Temples</a>
                    </li>
                    <li>
                        <a href="#tandava" className="nav-link" onClick={(e) => {
                            e.preventDefault();
                            scrollToSection('tandava');
                        }}>Tandava</a>
                    </li>
                    <li>
                        <a href="#bhairava" className="nav-link" onClick={(e) => {
                            e.preventDefault();
                            scrollToSection('bhairava');
                        }}>Bhairava</a>
                    </li>
                    <li>
                        <a href="#vishnu" className="nav-link" onClick={(e) => {
                            e.preventDefault();
                            scrollToSection('vishnu');
                        }}>Vishnu</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;
