import React, { useContext, useEffect, useState } from 'react';
import axios from '../../api/axiosInstance';
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import Spinner from '../Spinner';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const Connections = () => {
    const { user } = useContext(AuthContext);
    const [connections, setConnections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [newMessage, setNewMessage] = useState('');

    // Load connections for the logged-in user
    const loadConnections = async () => {
        if (!user?.email) return;
        setLoading(true);
        try {
            const { data } = await axios.get(`/connection?email=${user.email}`);
            setConnections(data);
        } catch (err) {
            console.error(err);
            toast.error('Failed to load your connections');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadConnections();
    }, [user]);

    // Update message
    const handleUpdate = async (id) => {
        if (!newMessage.trim()) {
            toast.warn('Please enter a message');
            return;
        }
        try {
            await axios.patch(`/connection/${id}`, { message: newMessage });
            toast.success('Message updated');
            setEditingId(null);
            setNewMessage('');
            loadConnections();
        } catch (err) {
            console.error(err);
            toast.error('Failed to update message');
        }
    };

    // Delete connection
    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'This will permanently delete the connection.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        });

        if (!confirm.isConfirmed) return;

        try {
            await axios.delete(`/connection/${id}`);
            toast.success('Connection deleted');
            setConnections((prev) => prev.filter((c) => c._id !== id));
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete connection');
        }
    };

    if (loading) return <Spinner />;

    return (
        <div className="container mx-auto px-4 my-8">
            <h1 className="text-2xl font-bold mb-4">My Connections</h1>

            {connections.length === 0 ? (
                <p className="text-gray-500">No connections yet.</p>
            ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {connections.map((conn) => (
                        <div key={conn._id} className="bg-white p-4 rounded-xl shadow-md">
                            <h2 className="text-lg font-semibold text-purple-900">
                                {conn.partnerName || 'Unnamed Partner'}
                            </h2>
                            <p className="text-sm text-gray-500">{conn.partnerEmail}</p>
                            <p className="mt-2 text-gray-700">
                                <b>Your Message:</b>{' '}
                                {editingId === conn._id ? (
                                    <textarea
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        className="textarea textarea-bordered w-full mt-1"
                                    />
                                ) : (
                                    conn.message || 'No message'
                                )}
                            </p>

                            <div className="mt-4 flex gap-2">
                                {editingId === conn._id ? (
                                    <>
                                        <button
                                            onClick={() => handleUpdate(conn._id)}
                                            className="btn btn-success btn-sm text-white"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => {
                                                setEditingId(null);
                                                setNewMessage('');
                                            }}
                                            className="btn btn-secondary btn-sm"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => {
                                                setEditingId(conn._id);
                                                setNewMessage(conn.message || '');
                                            }}
                                            className="btn btn-primary btn-sm bg-gradient-to-r from-purple-900 to-gray-400 border-none text-white"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(conn._id)}
                                            className="btn btn-error btn-sm text-white"
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Connections;
