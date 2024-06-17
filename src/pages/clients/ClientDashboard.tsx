// src/pages/clients/ClientDashboard.tsx
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

const ClientDashboard: React.FC = () => {
  const { username } = useSelector((state: RootState) => state.auth);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Client Dashboard</h1>
      <p className="text-lg mb-4">Welcome, {username}!</p>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-800">
          This is your private dashboard content as a client.
        </p>
      </div>
    </div>
  );
};

export default ClientDashboard;
