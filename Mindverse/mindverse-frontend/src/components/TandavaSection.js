import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './TandavaSection.css';

const tandavaVerses = [
    {
        sanskrit: "जटाटवीगलज्जलप्रवाहपावितस्थले गलेऽवलम्ब्यलम्बितां भुजंगतुंगमालिकाम्",
        translation: "With the celestial river cascading from the crown of matted hair, and a garland of serpents hanging from the neck",
        energy: "fierce"
    },
    {
        sanskrit: "डमड्डमड्डमड्डमन्निनादवड्डमर्वयं चकार चण्डताण्डवं तनोतु नः शिवः शिवम्",
        translation: "Creating thunderous sounds of DAMAD DAMAD DAMAD from the damaru, performing the fierce Tandava dance, may Lord Shiva grant us auspiciousness",
        energy: "powerful"
    },
    {
        sanskrit: "ध्वनिक्रमप्रवर्तितप्रचण्डताण्डवः शिवः",
        translation: "Lord Shiva, whose furious Tandava is initiated by the rhythmic beat of the drum",
        energy: "cosmic"
    },
    {
        sanskrit: "स्फुरद्दिगन्तसन्ततिप्रमोदमानमानसे",
        translation: "With a mind filled with joy spreading to the ends of all directions",
        energy: "divine"
    }
];

const TandavaSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

    return (
        <section className="tandava-section parallax-section" id="tandava" ref={sectionRef}>
            <div className="tandava-overlay">
                <div className="storm-effect"></div>
                <div className="lightning-effect"></div>
            </div>

            <div className="parallax-content">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 1 }}
                    className="section-header"
                >
                    <div className="tandava-title-container">
                        <h2 className="section-title tandava-title">Shiva Tandava Stotram</h2>
                        <p className="section-subtitle">
                            The Cosmic Dance of Creation and Destruction
                        </p>
                    </div>

                    <div className="nataraja-visual">
                        <div className="nataraja-ring ring-outer"></div>
                        <div className="nataraja-ring ring-middle"></div>
                        <div className="nataraja-ring ring-inner"></div>
                        <div className="nataraja-aum">ॐ</div>
                    </div>
                </motion.div>

                <div className="verses-container">
                    {tandavaVerses.map((verse, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: index * 0.3 }}
                            className={`tandava-verse-panel ${verse.energy}`}
                        >
                            <div className="verse-number">{String(index + 1).padStart(2, '0')}</div>

                            <div className="verse-sanskrit">{verse.sanskrit}</div>

                            <div className="verse-divider">
                                <span className="divider-aum">ॐ</span>
                            </div>

                            <div className="verse-translation">{verse.translation}</div>

                            <div className="verse-energy-indicator">
                                <div className={`energy-pulse ${verse.energy}`}></div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="tandava-footer"
                >
                    <div className="damaru-symbol">🔱</div>
                    <p className="tandava-blessing">
                        नमो नमः शंकराय
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default TandavaSection;
