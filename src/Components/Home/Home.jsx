import React from 'react';
import LatestMates from '../LatestMates/LatestMates';
import Hero from '../Hero/Hero';
import TestimonialsSection from '../TestimonialsSection';
import HowItWorks from '../HowItWorks';
import FeaturesSection from '../FeaturesSection';
import SubjectsSection from '../SubjectsSection';
import HighlightsSection from '../HighlightsSection';
import CommunitySection from '../CommunitySection';
import FAQSection from '../FAQSection';
import CTASection from '../CTASection';

const latestMatesPromise = fetch('https://study-mate-server-phi.vercel.app/mates').then(res => res.json());


const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <LatestMates latestMatesPromise={latestMatesPromise}></LatestMates>
            <FeaturesSection></FeaturesSection>
            <HowItWorks></HowItWorks>
            <SubjectsSection></SubjectsSection>
            <HighlightsSection></HighlightsSection>
            <CommunitySection></CommunitySection>
            <TestimonialsSection></TestimonialsSection>
            <FAQSection></FAQSection>
            <CTASection></CTASection>
        </div>
    );
};

export default Home;