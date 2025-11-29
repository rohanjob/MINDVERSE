import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './StoriesSection.css';

const stories = [
    {
        id: 1,
        title: "Shiva in Meditation",
        description: "On the snow-clad peaks of Mount Kailash, Lord Shiva sits in eternal meditation, the cosmic yogi absorbed in divine consciousness. His stillness holds the universe in balance, emanating peace and spiritual power that transcends time and space.",
        verse: "योगी योगेश्वरो योगः | The Supreme Lord of Yoga in Perfect Union"
    },
    {
        id: 2,
        title: "The Halahala Sacrifice",
        description: "During the churning of the cosmic ocean, when the deadly halahala poison emerged threatening to destroy all creation, Lord Shiva consumed it to save the universe. The poison turned his throat blue, earning him the name Neelkanth - the blue-throated one.",
        verse: "नीलकण्ठाय नमः | Salutations to the Blue-Throated Lord"
    },
    {
        id: 3,
        title: "Destroyer of Tripurasura",
        description: "When the three demon cities of Tripura terrorized the universe, Lord Shiva destroyed them with a single divine arrow of fire. This cosmic act demonstrated his role as the destroyer of evil and protector of dharma.",
        verse: "त्रिपुरारि समर्चितं | The Worshipped Destroyer of the Three Cities"
    },
    {
        id: 4,
        title: "The Divine Union",
        description: "Shiva and Parvati represent the perfect union of consciousness and energy, Purusha and Prakriti. Their divine marriage symbolizes the harmony of masculine and feminine principles, creating and sustaining the cosmos.",
        verse: "उमासहितं शिवं | Shiva United with Uma (Parvati)"
    }
];

const StoriesSection = () => {
    const [activeStory, setActiveStory] = useState(0);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

    useEffect(() => {
        if (isInView) {
            const interval = setInterval(() => {
                setActiveStory((prev) => (prev + 1) % stories.length);
            }, 8000);
            return () => clearInterval(interval);
        }
    }, [isInView]);

    return (
        <section className="stories-section parallax-section" id="stories" ref={sectionRef}>
            <div className="smoke-overlay" />

            <div className="parallax-content">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1 }}
                    className="section-header"
                >
                    <h2 className="section-title">Divine Legends of Mahadev</h2>
                    <p className="section-subtitle">
                        Sacred Stories from the Eternal Cosmic Dance
                    </p>
                </motion.div>

                <div className="stories-container">
                    {stories.map((story, index) => (
                        <motion.div
                            key={story.id}
                            initial={{ opacity: 0, x: -100 }}
                            animate={isInView && activeStory === index ? { opacity: 1, x: 0 } : { opacity: 0.3, x: -50 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className={`story-panel ${activeStory === index ? 'active' : ''}`}
                            onClick={() => setActiveStory(index)}
                        >
                            <div className="story-number">
                                {String(index + 1).padStart(2, '0')}
                            </div>

                            <div className="story-content">
                                <h3 className="story-title">{story.title}</h3>
                                <p className="story-description">{story.description}</p>

                                <div className="story-verse verse-panel">
                                    <span className="verse-text">{story.verse}</span>
                                </div>
                            </div>

                            <div className="story-decoration">
                                <div className=" aum-decoration">ॐ</div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Story Navigation Dots */}
                <div className="story-navigation">
                    {stories.map((_, index) => (
                        <button
                            key={index}
                            className={`story-dot ${activeStory === index ? 'active' : ''}`}
                            onClick={() => setActiveStory(index)}
                            aria-label={`Go to story ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StoriesSection;
