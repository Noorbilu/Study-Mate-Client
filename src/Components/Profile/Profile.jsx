import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';


const Profile = () => {
    const { user } = useContext(AuthContext);


    return (
        <div className="container mx-auto px-4 my-8 grid md:grid-cols-2 gap-6">
<img src={user?.photoURL || 'https://i.ibb.co/2h0b7hN/user.png'} alt="me" className="w-full h-72 object-cover rounded" />
<div>
<h1 className="text-2xl font-bold mb-2">My Profile</h1>
<p><b>Name:</b> {user?.displayName}</p>
<p><b>Email:</b> {user?.email}</p>
<p className="opacity-70 mt-2">Keep learning and collaborating!</p>
</div>
</div>
    );
};

export default Profile;