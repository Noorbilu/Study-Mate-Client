import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from '../../api/axiosInstance';
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import Spinner from '../Spinner';

const PartnerDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [partner, setPartner] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        setLoading(true);
        axios
            .get(`/mates/${id}`)
            .then((res) => setPartner(res.data))
            .catch(() => toast.error('Failed to load partner details'))
            .finally(() => setLoading(false));
    }, [id]);

    const sendRequest = async () => {
        try {
            await axios.post('/requests', {
                partnerId: partner._id,
                requesterUid: user.uid,
                requesterEmail: user.email,
                message,
            });
            setPartner((prev) => ({
                ...prev,
                partnerCount: (prev.partnerCount ?? 0) + 1,
            }));
            toast.success('Request sent!');
            setMessage('');
        } catch (e) {
            if (e.response?.status === 409)
                toast.warn('You already requested this partner');
            else toast.error('Failed to send request');
        }
    };

    if (loading) return <Spinner />;
    if (!partner)
        return (
            <div className="container mx-auto px-4 my-8">Partner not found</div>
        );

    return (
        <div className="container mx-auto px-4 my-8 grid md:grid-cols-2 gap-6">
            <img
                src={partner.profileimage}
                alt={partner.name}
                className="w-full h-72 object-cover rounded"
            />
            <div>
                <h1 className="text-2xl font-bold">{partner.name}</h1>
                <p className="opacity-80">{partner.location}</p>
                <div className="mt-2 space-y-1">
                    <div>Subject: <b>{partner.subject}</b></div>
                    <div>Study Mode: {partner.studyMode}</div>
                    <div>Availability: {partner.availabilityTime}</div>
                    <div>Experience: {partner.experienceLevel}</div>
                    <div>Rating: ⭐ {partner.rating ?? 0}</div>
                    <div>Partner Count: 🤝 {partner.partnerCount ?? 0}</div>
                </div>
                <div className="mt-4">
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="textarea textarea-bordered w-full"
                        placeholder="Add a short message (optional)"
                    ></textarea>
                    <button onClick={sendRequest} className="btn btn-primary mt-2 bg-gradient-to-r from-purple-900 to-gray-400 text-white border-none">
                        Send Partner Request
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PartnerDetails;
