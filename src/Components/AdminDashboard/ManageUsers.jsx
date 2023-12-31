import axios from "axios";
import { useEffect, useState } from "react";

const ManageUsers = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 8;
  
    useEffect(() => {
      axios.get(`http://localhost:5000/api/v1/users?page=${currentPage}`)
        .then((res) => {
          setAllUsers(res?.data);
        });
    }, [currentPage]);
  

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = allUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleMakeAdmin = (userId) => {
    axios.patch(`http://localhost:5000/api/v1/users/make-admin/${userId}`)
      .then((res) => {
        // Update the user list after making admin
        axios.get(`http://localhost:5000/api/v1/users?page=${currentPage}`)
          .then((res) => {
            setAllUsers(res?.data);
          });
      })
      .catch((error) => {
        console.error("Error making user admin:", error);
      });
  };

  const handleMakeAgent = (userId) => {
    axios.patch(`http://localhost:5000/api/v1/users/make-agent/${userId}`)
      .then((res) => {
        // Update the user list after making agent
        axios.get(`http://localhost:5000/api/v1/users?page=${currentPage}`)
          .then((res) => {
            setAllUsers(res?.data);
          });
      })
      .catch((error) => {
        console.error("Error making user agent:", error);
      });
  };
  const handleMarkFraud = (userId) => {
    axios.patch(`http://localhost:5000/api/v1/users/mark-fraud/${userId}`)
      .then((res) => {
        // Update the user list after marking fraud
        axios.get(`http://localhost:5000/api/v1/users?page=${currentPage}`)
          .then((res) => {
            setAllUsers(res?.data);
          });
      })
      .catch((error) => {
        console.error("Error marking user as fraud:", error);
      });
  };

  const handleDeleteUser = (userId) => {
    axios.delete(`http://localhost:5000/api/v1/users/${userId}`)
      .then((res) => {
        // Update the user list after deleting user
        axios.get(`http://localhost:5000/api/v1/users?page=${currentPage}`)
          .then((res) => {
            setAllUsers(res?.data);
          });
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-10 text-center"> Manage Users </h1>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentUsers.map((user, index) => (
                  <tr key={user?._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{index+1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user?.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user?.email}</td>
                    <td className="px-6 py-4 font-semibold whitespace-nowrap">{user?.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user?.role !== 'Admin' && (
                        <>
                          <button
                            onClick={() => handleMakeAdmin(user?._id)}
                            className="mr-2 px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                          >
                            Make Admin
                          </button>
                          <button
                            onClick={() => handleMakeAgent(user?._id)}
                            className="mr-2 px-4 py-2 font-medium text-white bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:shadow-outline-green active:bg-green-600 transition duration-150 ease-in-out"
                          >
                            Make Agent
                          </button>
                        </>
                      )}
                      {user?.role === 'Agent' && (
                        <button
                          onClick={() => handleMarkFraud(user?._id)}
                          className="mr-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                        >
                          Mark as Fraud
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteUser(user?._id)}
                        className="px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(allUsers.length / usersPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`mx-2 px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue ${currentPage === i + 1 ? 'bg-blue-700' : ''}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
