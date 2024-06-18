import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import axios from "axios";
import Swal from 'sweetalert2';
interface UserData {
  id: string;
  username: string;
  role: string;
}

const AdminDashboard: React.FC = () => {
  const { token, username } = useSelector((state: RootState) => state.auth);
  const [userData, setUserData] = useState<UserData[]>([]);
  const [updateUserData, setUpdateUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [usernameError, setUsernameError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/admin/getdata", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
      setLoading(false);
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
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
        "http://localhost:8080/admin/getdata/" + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUpdateUserData(response.data);
      setIsModalOpen(true);
      setLoading(false);
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to get data by id",
        showConfirmButton: false,
        timer: 1500
      });
      setLoading(false);
    } 
  };

  const handleDeleteUser = async (id: string) => {
    
      Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        // try {
           await axios.delete(
            `http://localhost:8080/admin/users/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ).then((response) =>{
          Swal.fire({
    icon: 'success',
    title: 'Deleted!',
    text: response.data.message,
  });
          }).then(()=>{
            fetchData();
          }).catch((err) =>{
          console.log(err);
             Swal.fire({
            icon: 'error',
            title: 'Failed to delete user',
            text: err,
          });
          })
      }
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUpdateUserData(null);
    setUsernameError(null);
  };

  const handleSaveUserData = async () => {
    if (!updateUserData) return;
    
    if (updateUserData.username.length <= 4) {
      setUsernameError("Username must be longer than 4 characters.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/admin/users/${updateUserData.id}`,
        {
          username: updateUserData.username,
          role: updateUserData.role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: response.data.message,
        showConfirmButton: false,
        timer: 1500
      });
      fetchData();
      handleCloseModal();
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to Update user',
        text: "",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-white">Admin Dashboard</h1>
      <p className="text-lg mb-4 text-white">Welcome, {username}!</p>
      <div className="bg-white shadow-md rounded-lg p-6">
        {loading ? (
          <p className="text-gray-800">Loading...</p>
        ) 
          : (
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
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                      Edit
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

      {isModalOpen && updateUserData && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-1/3">
            <h2 className="text-2xl mb-4">Edit User</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                value={updateUserData.username}
                onChange={(e) => {
                  setUpdateUserData({
                    ...updateUserData,
                    username: e.target.value,
                  });
                  setUsernameError(null);
                }}
                className="w-full px-4 py-2 border rounded"
              />
              {usernameError && (
                <p className="text-red-500 mt-2">{usernameError}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Role</label>
              <select
                value={updateUserData.role}
                onChange={(e) =>
                  setUpdateUserData({
                    ...updateUserData,
                    role: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border rounded"
              >
                <option value="admin">Admin</option>
                <option value="client">Client</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveUserData}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
