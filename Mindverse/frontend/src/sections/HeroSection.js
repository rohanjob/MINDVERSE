import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './HeroSection.css';

const HeroSection = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="hero-section parallax-section" id="home">
            {/* Parallax Background Layers */}
            <div
                className="hero-bg-layer hero-bg-cosmos"
                style={{ transform: `translateY(${scrollY * 0.5}px)` }}
            />

            <div
                className="hero-bg-layer hero-bg-mountains"
                style={{ transform: `translateY(${scrollY * 0.3}px)` }}
            />

            <div
                className="hero-bg-layer hero-bg-temple"
                style={{ transform: `translateY(${scrollY * 0.15}px)` }}
            />

            {/* Smoke Overlay */}
            <div className="smoke-overlay" />

            {/* Hero Content */}
            <div className="parallax-content hero-content">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="hero-text-container"
                >
                    {/* MindVerse Logo Placeholder */}
                    <div className="logo-placeholder">
                        <div className="logo-aum">ॐ</div>
                        <h1 className="brand-name">MindVerse</h1>
                        <p className="brand-tagline">A Divine Spiritual Universe</p>
                    </div>

                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="hero-subtitle"
                    >
                        Enter the Epic Realm of Lord Shiva
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.5 }}
                        className="hero-description"
                    >
                        Immerse yourself in a cinematic journey through sacred mythology,
                        divine temples, and timeless devotional stotrams. Experience the cosmic
                        energy of Mahadev through breathtaking visuals and spiritual storytelling.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 2 }}
                        className="hero-cta"
                    >
                        <button className="sacred-button divine-glow">
                            Begin Your Journey
                        </button>
                    </motion.div>

                    {/* Mantra */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 2.5 }}
                        className="hero-mantra"
                    >
                        ॐ नमः शिवाय
                    </motion.div>
                </motion.div>

                {/* Floating Divine Particles */}
                <div className="divine-particles-container">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="divine-particle"
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${8 + Math.random() * 4}s`
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 3, repeat: Infinity, repeatType: 'reverse' }}
                className="scroll-indicator"
            >
                <div className="scroll-arrow">↓</div>
                <p>Scroll to Explore</p>
            </motion.div>
        </section>
    );
};

export default HeroSection;
