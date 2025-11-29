import React from 'react'
import HeroSection from '@sections/HeroSection'
import StoriesSection from '@sections/StoriesSection'
import TemplesSection from '@sections/TemplesSection'
import TandavaSection from '@sections/TandavaSection'
import BhairavaSection from '@sections/BhairavaSection'
import VishnuSection from '@sections/VishnuSection'

const HomePage = () => {
    return (
        <main className="home-page">
            <HeroSection />
            <StoriesSection />
            <TemplesSection />
            <TandavaSection />
            <BhairavaSection />
            <VishnuSection />
        </main>
    )
}

export default HomePage
