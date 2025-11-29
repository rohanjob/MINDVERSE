import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './VishnuSection.css';

const VishnuSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

    const vishnuAvatars = [
        { name: "Matsya", symbol: "🐟", meaning: "The Fish" },
        { name: "Kurma", symbol: "🐢", meaning: "The Tortoise" },
        { name: "Varaha", symbol: "🐗", meaning: "The Boar" },
        { name: "Narasimha", symbol: "🦁", meaning: "The Man-Lion" },
        { name: "Vamana", symbol: "👤", meaning: "The Dwarf" },
        { name: "Parashurama", symbol: "⚔️", meaning: "The Warrior" },
        { name: "Rama", symbol: "🏹", meaning: "The Prince" },
        { name: "Krishna", symbol: "🪈", meaning: "The Divine" }
    ];

    return (
        <section className="vishnu-section parallax-section" id="vishnu" ref={sectionRef}>
            <div className="ocean-overlay">
                <div className="wave wave-1"></div>
                <div className="wave wave-2"></div>
                <div className="wave wave-3"></div>
            </div>

            <div className="parallax-content">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1 }}
                    className="section-header"
                >
                    <h2 className="section-title vishnu-title">Maha Vishnu Stotram</h2>
                    <p className="section-subtitle">
                        The Supreme Preserver and Protector of Dharma
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="vishnu-main-card"
                >
                    <div className="vishnu-symbol-container">
                        <div className="chakra-visual">
                            <div className="chakra-ring"></div>
                            <div className="chakra-center">ॐ</div>
                        </div>
                        <div className="shankha-visual">🐚</div>
                    </div>

                    <div className="vishnu-mantra">
                        <h3 className="mantra-heading">Vishnu Mantra</h3>
                        <div className="sanskrit-text">
                            ॐ नमो नारायणाय
                        </div>
                        <div className="mantra-meaning">
                            "Om, Salutations to Lord Narayana"
                        </div>
                    </div>

                    <div className="vishnu-description">
                        <p>
                            Lord Maha Vishnu, the supreme protector and preserver of the universe, reclines
                            on the cosmic serpent Ananta in the ocean of milk. With each breath, he creates
                            and sustains countless universes. His divine incarnations (avatars) descend to Earth
                            whenever dharma declines and adharma rises, restoring cosmic balance and protecting
                            the righteous. The holder of the Sudarshana Chakra and Panchajanya Shankha, he
                            embodies infinite compassion, cosmic order, and eternal truth.
                        </p>
                    </div>
                </motion.div>

                <div className="avatars-section">
                    <motion.h3
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="avatars-heading"
                    >
                        Dashavatar - The Ten Divine Incarnations
                    </motion.h3>

                    <div className="avatars-grid">
                        {vishnuAvatars.map((avatar, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                                className="avatar-card"
                            >
                                <div className="avatar-symbol">{avatar.symbol}</div>
                                <div className="avatar-name">{avatar.name}</div>
                                <div className="avatar-meaning">{avatar.meaning}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 1, delay: 2 }}
                    className="vishnu-footer"
                >
                    <div className="lotus-decoration">🪷</div>
                    <p className="vishnu-blessing">सर्वे भवन्तु सुखिनः</p>
                    <p className="blessing-meaning">"May All Beings Be Happy"</p>
                </motion.div>
            </div>
        </section>
    );
};

export default VishnuSection;
