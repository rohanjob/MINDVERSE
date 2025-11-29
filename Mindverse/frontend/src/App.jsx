import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Navigation from '@components/Navigation'
import HomePage from '@pages/HomePage'
import './App.css'

function App() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Dramatic entry animation
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)

        // Create cosmic particles
        if (!isLoading) {
            const createParticles = () => {
                const container = document.querySelector('.cosmic-particles')
                if (container) {
                    for (let i = 0; i < 50; i++) {
                        const particle = document.createElement('div')
                        particle.className = 'particle'
                        particle.style.left = `${Math.random() * 100}%`
                        particle.style.animationDelay = `${Math.random() * 20}s`
                        particle.style.animationDuration = `${15 + Math.random() * 10}s`
                        container.appendChild(particle)
                    }
                }
            }
            createParticles()
        }
    }, [isLoading])

    if (isLoading) {
        return (
            <div className="loading-screen">
                <div className="loading-content">
                    <div className="aum-loader">ॐ</div>
                    <h2 className="loading-text">Entering the Divine Universe</h2>
                    <div className="spinner"></div>
                </div>
            </div>
        )
    }

    return (
        <Router>
            <div className="App">
                {/* Fixed Aum Watermark */}
                <div className="aum-watermark"></div>

                {/* Cosmic Particles */}
                <div className="cosmic-particles"></div>

                {/* Navigation */}
                <Navigation />

                {/* Main Content */}
                <HomePage />

                {/* Footer */}
                <footer className="divine-footer">
                    <div className="footer-content">
                        <div className="footer-aum">ॐ</div>
                        <p className="footer-text">MindVerse - A Sacred Digital Sanctuary</p>
                        <p className="footer-blessing">ॐ नमः शिवाय | Har Har Mahadev</p>
                        <div className="footer-links">
                            <span>© 2025 MindVerse. All Rights Reserved.</span>
                        </div>
                    </div>
                </footer>
            </div>
        </Router>
    )
}

export default App
