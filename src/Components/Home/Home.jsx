import React from 'react';
import LatestMates from '../LatestMates/LatestMates';
import Hero from '../Hero/Hero';
import TestimonialsSection from '../TestimonialsSection';
import HowItWorks from '../HowItWorks';

const latestMatesPromise = fetch('http://localhost:3000/latest-mates').then(res => res.json());

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <LatestMates latestMatesPromise={latestMatesPromise}></LatestMates>
            <HowItWorks></HowItWorks>
            <TestimonialsSection></TestimonialsSection>
        </div>
    );
};

export default Home;