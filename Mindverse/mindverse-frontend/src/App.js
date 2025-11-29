import React, { useEffect, useState } from 'react';
import HeroSection from './components/HeroSection';
import StoriesSection from './components/StoriesSection';
import TemplesSection from './components/TemplesSection';
import TandavaSection from './components/TandavaSection';
import BhairavaSection from './components/BhairavaSection';
import VishnuSection from './components/VishnuSection';
import CosmicParticles from './components/CosmicParticles';
import Navigation from './components/Navigation';
import './App.css';

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time for dramatic entry
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        // Create cosmic particle effect
        const createParticles = () => {
            const container = document.querySelector('.cosmic-particles');
            if (container) {
                for (let i = 0; i < 50; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'particle';
                    particle.style.left = `${Math.random() * 100}%`;
                    particle.style.animationDelay = `${Math.random() * 20}s`;
                    particle.style.animationDuration = `${15 + Math.random() * 10}s`;
                    container.appendChild(particle);
                }
            }
        };

        if (!isLoading) {
            createParticles();
        }
    }, [isLoading]);

    if (isLoading) {
        return (
            <div className="loading-screen">
                <div className="loading-content">
                    <div className="aum-loader">ॐ</div>
                    <h2 className="loading-text">Entering the Divine Universe</h2>
                    <div className="spinner"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="App">
            {/* Fixed Aum Watermark */}
            <div className="aum-watermark"></div>

            {/* Cosmic Particles */}
            <div className="cosmic-particles"></div>

            {/* Navigation */}
            <Navigation />

            {/* Main Sections with Cinematic Scroll */}
            <main>
                <HeroSection />
                <StoriesSection />
                <TemplesSection />
                <TandavaSection />
                <BhairavaSection />
                <VishnuSection />
            </main>

            {/* Footer */}
            <footer className="divine-footer">
                <div className="footer-content">
                    <div className="footer-aum">ॐ</div>
                    <p className="footer-text">
                        MindVerse - A Sacred Digital Sanctuary
                    </p>
                    <p className="footer-blessing">
                        ॐ नमः शिवाय | Har Har Mahadev
                    </p>
                    <div className="footer-links">
                        <span>© 2025 MindVerse. All Rights Reserved.</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;
