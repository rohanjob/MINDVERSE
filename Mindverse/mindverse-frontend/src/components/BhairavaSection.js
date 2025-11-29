import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './BhairavaSection.css';

const BhairavaSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

    const bhairavaAttributes = [
        { icon: "🔥", title: "KALA", description: "Master of Time and Death" },
        { icon: "⚔️", title: "KRODHA", description: "Fierce Protector of Dharma" },
        { icon: "💀", title: "SAMHARA", description: "Destroyer of Evil Forces" },
        { icon: "🐕", title: "VAHANA", description: "Guardian with Divine Dog" }
    ];

    return (
        <section className="bhairava-section parallax-section" id="bhairava" ref={sectionRef}>
            <div className="bhairava-fire-overlay"></div>

            <div className="parallax-content">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1 }}
                    className="section-header"
                >
                    <h2 className="section-title bhairava-title">Bhairava Ashtakam</h2>
                    <p className="section-subtitle">
                        The Fierce Guardian and Protector of the Cosmos
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="bhairava-main-content"
                >
                    <div className="bhairava-mantra-card">
                        <div className="mantra-flame">🔱</div>
                        <h3 className="mantra-title">Bhairava Mantra</h3>
                        <div className="sanskrit-mantra">
                            ॐ काल भैरवाय नमः
                        </div>
                        <div className="mantra-translation">
                            "Om, Salutations to the Fierce Lord of Time"
                        </div>

                        <div className="bhairava-description">
                            <p>
                                Bhairava, the fierce manifestation of Lord Shiva, is the guardian of the eight
                                directions and the annihilator of fear. He represents the destructive aspects of
                                time and is worshipped for protection, courage, and spiritual liberation. His
                                terrifying form embodies the ultimate truth that transcends material existence.
                            </p>
                        </div>
                    </div>
                </motion.div>

                <div className="bhairava-attributes-grid">
                    {bhairavaAttributes.map((attr, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50, rotate: -10 }}
                            animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.6 + index * 0.15 }}
                            className="attribute-card"
                        >
                            <div className="attribute-icon">{attr.icon}</div>
                            <h4 className="attribute-title">{attr.title}</h4>
                            <p className="attribute-description">{attr.description}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="bhairava-footer"
                >
                    <div className="footer-decoration">
                        <div className="trident-symbol">🔱</div>
                        <p className="bhairava-blessing">भयं नाशयति भैरवः</p>
                        <p className="blessing-translation">"Bhairava Destroys All Fear"</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default BhairavaSection;
