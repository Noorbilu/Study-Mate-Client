import React from 'react';
import LatestMates from '../LatestMates/LatestMates';
import Hero from '../Hero/Hero';

const latestMatesPromise = fetch('http://localhost:3000/latest-mates').then(res => res.json());

const Home = () => {




    return (
        <div>
            <Hero></Hero>
            <LatestMates latestMatesPromise={latestMatesPromise}></LatestMates>
        </div>
    );
};

export default Home;