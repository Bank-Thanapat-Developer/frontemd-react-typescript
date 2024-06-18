import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import axios from "axios";
import Swal from "sweetalert2";
interface UserData {
  id: string;
  username: string;
  role: string;
}

const ClientDashboard: React.FC = () => {
  const { token, username } = useSelector((state: RootState) => state.auth);
  const [userData, setUserData] = useState<UserData[]>([]);
  const [viewUserData, setViewUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/client/getdata", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      
      setUserData(response.data);
      setLoading(false);
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Failed to fetch data",
        showConfirmButton: false,
        timer: 1500
      });
      setLoading(false);
    }
  };

  const handleGetById = async (id: string) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/client/profile/" + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setViewUserData(response.data);
      setIsViewModalOpen(true);
      setLoading(false);
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Failed to get data by id",
        showConfirmButton: false,
        timer: 1500
      });
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsViewModalOpen(false);
    setViewUserData(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-white">Client Dashboard</h1>
      <p className="text-lg mb-4 text-white">Welcome, {username}!</p>
      <div className="bg-white shadow-md rounded-lg p-6">
        {loading ? (
          <p className="text-gray-800">Loading...</p>
        )  : (
          <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-center">ID</th>
              <th className="py-2 px-4 border-b text-center">Username</th>
              <th className="py-2 px-4 border-b text-center">Role</th>
              <th className="py-2 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b text-center">{user.id}</td>
                <td className="py-2 px-4 border-b text-center">{user.username}</td>
                <td className="py-2 px-4 border-b text-center">{user.role}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    onClick={() => handleGetById(user.id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        )}
      </div>

      {isViewModalOpen && viewUserData && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-1/3">
            <h2 className="text-2xl mb-4">View Profile</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <p className="px-4 py-2 border rounded bg-gray-100">{viewUserData.username}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Role</label>
              <p className="px-4 py-2 border rounded bg-gray-100">{viewUserData.role}</p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;
