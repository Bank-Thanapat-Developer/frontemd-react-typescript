import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import axios from "axios";

interface UserData {
  id: string;
  username: string;
  role: string;
}

const AdminDashboard: React.FC = () => {
  const { token, username } = useSelector((state: RootState) => state.auth);
  const [userData, setUserData] = useState<UserData[]>([]);
  const [updateUserData, setUpdateUserData] = useState<UserData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = async () => {
    console.log(token);
    try {
      const response = await axios.get("http://localhost:8080/admin/getdata", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch data");
      setLoading(false);
    }
  };

  const handleGetById = async (id: string) => {
    console.log(token);
    console.log(id);
    try {
      const response = await axios.get(
        "http://localhost:8080/admin/getdata/" + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      //{id: 1718467025202888700, username: 'admin', role: 'admin'}
      setUpdateUserData(response.data)
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch data");
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    console.log(token);
    try {
      const response = await axios.delete(
        `http://localhost:8080/admin/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Delete Success:", response);
      fetchData(); // Update the local data after successful deletion
    } catch (error) {
      console.error("Delete Error:", error);
      setError("Failed to delete user. Please try again later."); // Display a generic error message
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-white">Admin Dashboard</h1>
      <p className="text-lg mb-4 text-white">Welcome, {username}!</p>
      <div className="bg-white shadow-md rounded-lg p-6">
        {loading ? (
          <p className="text-gray-800">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Username</th>
                <th className="py-2 px-4 border-b">Role</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user) => (
                <tr key={user.id}>
                  <td className="py-2 px-4 border-b">{user.id}</td>
                  <td className="py-2 px-4 border-b">{user.username}</td>
                  <td className="py-2 px-4 border-b">{user.role}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleGetById(user.id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                      Update Username
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
