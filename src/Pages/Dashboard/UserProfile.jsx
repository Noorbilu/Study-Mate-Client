import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-white p-8 rounded-2xl shadow border border-fuchsia-100">
      <h1 className="text-3xl font-bold text-fuchsia-900 mb-6">Profile</h1>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
        <img
          src={user?.photoURL || "https://i.ibb.co/2h0b7hN/user.png"}
          alt="avatar"
          className="w-28 h-28 rounded-full border shadow"
        />
        <div className="space-y-3">
          <p><strong>Name:</strong> {user?.displayName}</p>
          <p><strong>Email:</strong> {user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;