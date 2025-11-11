import React from 'react';
import pic from './error.jpg';
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div className='bg-pink-100 min-h-screen flex flex-col justify-center items-center text-center'>
            <img className='max-w-3/12 items-center' src={pic} alt="" />
            <div className='text-center'>
                <h1 className='text-6xl font-bold text-pink-950'>Oops, page not found!</h1>
                <p className='mt-5 text-gray-500'>The page you are looking for is not available.</p>
                <Link to='/'><button className="btn m-2 bg-gradient-to-r from-pink-900 to-pink-300 text-white border-none">Go Back</button></Link>
            </div>
        </div>
    );
};

export default ErrorPage;