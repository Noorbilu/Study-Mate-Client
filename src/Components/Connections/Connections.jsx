import React, { useContext, useEffect, useState } from 'react';
import axios from '../../api/axiosInstance';
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import Spinner from '../Spinner';

const Connections = () => {
  const { user } = useContext(AuthContext);
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});

  // Load connections
  const loadConnections = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const { data } = await axios.get(`/connection?email=${user.email}`);
      setConnections(data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load connections');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConnections();
  }, [user]);

  // Start editing
  const startEdit = (conn) => {
    setEditingId(conn._id);
    setEditedData({
      partnerName: conn.partnerName,
      partnerEmail: conn.partnerEmail,
      message: conn.message,
    });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditedData({});
  };

  // Save update
  const saveEdit = async (id) => {
    try {
      await axios.patch(`/connection/${id}`, editedData);
      toast.success('Updated successfully');
      cancelEdit();
      loadConnections();
    } catch (err) {
      console.error(err);
      toast.error('Failed to update');
    }
  };

  // Delete connection
  const deleteConnection = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the connection.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`/connection/${id}`);
      toast.success('Deleted successfully');
      setConnections((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete');
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
              {editingId === conn._id ? (
                <>
                  <input
                    type="text"
                    value={editedData.partnerName}
                    onChange={(e) =>
                      setEditedData({ ...editedData, partnerName: e.target.value })
                    }
                    className="input input-bordered w-full mb-2"
                  />
                  <input
                    type="email"
                    value={editedData.partnerEmail}
                    onChange={(e) =>
                      setEditedData({ ...editedData, partnerEmail: e.target.value })
                    }
                    className="input input-bordered w-full mb-2"
                  />
                  <textarea
                    value={editedData.message}
                    onChange={(e) =>
                      setEditedData({ ...editedData, message: e.target.value })
                    }
                    className="textarea textarea-bordered w-full mb-2"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEdit(conn._id)}
                      className="btn btn-success btn-sm"
                    >
                      Save
                    </button>
                    <button onClick={cancelEdit} className="btn btn-secondary btn-sm">
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-lg font-semibold">{conn.partnerName}</h2>
                  <p className="text-sm text-gray-500">{conn.partnerEmail}</p>
                  <p className="mt-2">{conn.message || 'No message'}</p>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => startEdit(conn)}
                      className="btn btn-primary btn-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteConnection(conn._id)}
                      className="btn btn-error btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Connections;
