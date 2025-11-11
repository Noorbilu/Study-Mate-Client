import React, { useContext, useEffect, useState } from 'react';
import axios from '../../api/axiosInstance';
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Spinner from '../Spinner';
import 'sweetalert2/dist/sweetalert2.min.css';

const Connections = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [edit, setEdit] = useState(null);

    // Load requests
    const load = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/requests/me', { params: { requesterUid: user.uid } });
            setItems(Array.isArray(data?.data) ? data.data : []);
        } catch (err) {
            console.error(err);
            toast.error('Failed to load requests');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.uid) load();
    }, [user]);

    // Delete request
    const remove = async (id) => {
        const res = await Swal.fire({
            title: 'Delete this request?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete',
        });

        if (res.isConfirmed) {
            try {
                await axios.delete(`/requests/${id}`);
                setItems(prev => prev.filter(x => x._id !== id));
                toast.success('Deleted');
            } catch (err) {
                console.error(err);
                toast.error('Failed to delete');
            }
        }
    };

    // Update request
    const save = async () => {
        if (!edit) return;
        try {
            await axios.patch(`/requests/${edit._id}`, { message: edit.message });
            setItems(prev => prev.map(x => x._id === edit._id ? { ...x, message: edit.message } : x));
            setEdit(null);
            toast.success('Updated');
        } catch (err) {
            console.error(err);
            toast.error('Failed to update');
        }
    };

    if (loading) return <Spinner />;

    return (
        <div className="container mx-auto px-4 my-8">
            <h1 className="text-2xl font-bold mb-4">My Connections</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr><th>Partner</th><th>Subject</th><th>Mode</th><th>Message</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        {items.map(r => (
                            <tr key={r._id}>
                                <td className="flex items-center gap-2">
                                    <img src={r.partnerImage} alt={r.partnerName} className="w-10 h-10 rounded-full object-cover" />
                                    <span>{r.partnerName}</span>
                                </td>
                                <td>{r.subject}</td>
                                <td>{r.studyMode}</td>
                                <td className="max-w-xs truncate">{r.message}</td>
                                <td className="flex gap-2">
                                    <button className="btn btn-sm" onClick={() => setEdit(r)}>Update</button>
                                    <button className="btn btn-sm btn-error text-white" onClick={() => remove(r._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            text

            {edit && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Update Message</h3>
                        <textarea className="textarea textarea-bordered w-full mt-2" rows="4"
                            value={edit.message} onChange={(e) => setEdit({ ...edit, message: e.target.value })} />
                        <div className="modal-action">
                            <button className="btn" onClick={() => setEdit(null)}>Cancel</button>
                            <button className="btn btn-primary" onClick={save}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Connections;
