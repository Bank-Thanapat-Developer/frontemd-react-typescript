import React from "react";

const ClientDashboard = () => {
  return (
    <div className="relative overflow-x-auto  h-auto mx-36 my-10  rounded-lg">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
        Client
      </h1>
      <table className="h-auto w-4/5 mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
          <tr>
            <th scope="col" className="px-4 py-2">
              Id
            </th>
            <th scope="col" className="px-4 py-2">
              Username
            </th>
            <th scope="col" className="px-4 py-2">
              Role
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white dark:bg-gray-700 border-b dark:border-gray-600">
            <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
              1
            </td>
            <td className="px-4 py-3">Silver</td>
            <td className="px-4 py-3">client</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ClientDashboard;
