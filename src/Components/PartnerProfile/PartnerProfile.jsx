import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import axios from '../../api/axiosInstance';
import { toast } from 'react-toastify';

const PartnerProfile = () => {
    const { user } = useContext(AuthContext);
    const [form, setForm] = useState({
        name: user?.displayName || '',
        profileimage: user?.photoURL || '',
        subject: '',
        studyMode: 'Online',
        availabilityTime: '',
        location: '',
        experienceLevel: 'Beginner',
        rating: 0,
        partnerCount: 0,
        email: user?.email || ''
    });

    const onChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...form, ownerUid: user.uid };
            await axios.post('/partners', payload);
            toast.success('Profile created!');
            setForm(f => ({ ...f, subject: '', availabilityTime: '', location: '' }));
        } catch (e) {
            console.error(e);
            toast.error('Failed to create profile');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 bg-purple-50 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-fuchsia-900 text-center">Create Partner Profile</h1>

            <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                <input
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    placeholder="Full Name"
                    className="input input-bordered w-full"
                    required
                />
                <input
                    name="profileimage"
                    value={form.profileimage}
                    onChange={onChange}
                    placeholder="Profile Image URL"
                    className="input input-bordered w-full"
                    required
                />
                <input
                    name="subject"
                    value={form.subject}
                    onChange={onChange}
                    placeholder="Subject (e.g., Math, English)"
                    className="input input-bordered w-full"
                    required
                />
                <select
                    name="studyMode"
                    value={form.studyMode}
                    onChange={onChange}
                    className="select select-bordered w-full"
                >
                    <option>Online</option>
                    <option>Offline</option>
                </select>
                <input
                    name="availabilityTime"
                    value={form.availabilityTime}
                    onChange={onChange}
                    placeholder="Availability (e.g., Evening 6–9 PM)"
                    className="input input-bordered w-full"
                />
                <input
                    name="location"
                    value={form.location}
                    onChange={onChange}
                    placeholder="Location (City/Area)"
                    className="input input-bordered w-full"
                />
                <select
                    name="experienceLevel"
                    value={form.experienceLevel}
                    onChange={onChange}
                    className="select select-bordered w-full"
                >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Expert</option>
                </select>
                <input
                    name="rating"
                    type="number"
                    min="0"
                    max="5"
                    value={form.rating}
                    onChange={onChange}
                    placeholder="Rating (0-5)"
                    className="input input-bordered w-full"
                />
                <input
                    name="partnerCount"
                    type="number"
                    min="0"
                    value={form.partnerCount}
                    onChange={onChange}
                    placeholder="Partner Count"
                    className="input input-bordered w-full"
                />
                <input
                    name="email"
                    value={form.email}
                    className="input input-bordered w-full bg-gray-100"
                    readOnly
                />
                <button
                    type="submit"
                    className="btn btn-primary md:col-span-2 bg-fuchsia-800 border-none hover:bg-fuchsia-900"
                >
                    Create Profile
                </button>
            </form>
        </div>
    );
};

export default PartnerProfile;
