import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './TemplesSection.css';

const temples = [
    {
        id: 1,
        name: "Kedarnath",
        location: "Uttarakhand, Himalayas",
        description: "Nestled in the snow-clad Himalayas at 3,583 meters, Kedarnath is one of the twelve Jyotirlingas. The ancient stone temple stands as a testament to unwavering devotion, surrounded by majestic peaks and pristine glaciers.",
        significance: "One of the Chardham pilgrimage sites",
        imageClass: "temple-kedarnath"
    },
    {
        id: 2,
        name: "Kashi Vishwanath",
        location: "Varanasi, Uttar Pradesh",
        description: "The golden spire of Kashi Vishwanath temple rises majestically on the banks of the holy Ganga. This eternal city of light has witnessed countless devotees seeking moksha and divine blessings for millennia.",
        significance: "The most sacred Jyotirlinga",
        imageClass: "temple-kashi"
    },
    {
        id: 3,
        name: "Rameshwaram",
        location: "Tamil Nadu",
        description: "Where Lord Rama worshipped Shiva before his journey to Lanka, this temple features the longest corridor among Hindu temples. The sacred island connects devotion with the infinite ocean.",
        significance: "Southern Jyotirlinga pilgrimage",
        imageClass: "temple-rameshwaram"
    },
    {
        id: 4,
        name: "Somnath",
        location: "Gujarat",
        description: "Standing proudly against the Arabian Sea, Somnath temple has been destroyed and rebuilt numerous times, symbolizing the eternal nature of faith. The first among the twelve Jyotirlingas.",
        significance: "First of the twelve Jyotirlingas",
        imageClass: "temple-somnath"
    }
];

const TemplesSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

    return (
        <section className="temples-section parallax-section" id="temples" ref={sectionRef}>
            <div className="smoke-overlay" />

            <div className="parallax-content">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1 }}
                    className="section-header"
                >
                    <h2 className="section-title">Sacred Abodes of Shiva</h2>
                    <p className="section-subtitle">
                        Divine Temples Across the Mystical Lands of Bharat
                    </p>
                </motion.div>

                <div className="temples-grid">
                    {temples.map((temple, index) => (
                        <motion.div
                            key={temple.id}
                            initial={{ opacity: 0, y: 80 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className="temple-card"
                        >
                            <div className={`temple-image ${temple.imageClass}`}>
                                <div className="temple-overlay">
                                    <div className="temple-aum">ॐ</div>
                                </div>
                            </div>

                            <div className="temple-content">
                                <h3 className="temple-name">{temple.name}</h3>
                                <p className="temple-location">
                                    <span className="location-icon">📍</span>
                                    {temple.location}
                                </p>
                                <p className="temple-description">{temple.description}</p>

                                <div className="temple-significance">
                                    <span className="significance-label">Sacred Significance:</span>
                                    <span className="significance-text">{temple.significance}</span>
                                </div>

                                <button className="temple-explore-btn">
                                    Explore Temple
                                    <span className="btn-arrow">→</span>
                                </button>
                            </div>

                            <div className="temple-glow"></div>
                        </motion.div>
                    ))}
                </div>

                {/* Divine Decoration */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 1, delay: 1 }}
                    className="temples-decoration"
                >
                    <div className="decoration-line"></div>
                    <div className="decoration-aum">ॐ नमः शिवाय</div>
                    <div className="decoration-line"></div>
                </motion.div>
            </div>
        </section>
    );
};

export default TemplesSection;
