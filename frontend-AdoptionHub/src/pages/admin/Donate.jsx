import React, { useEffect, useState } from "react";
import { getAllUserApi } from "../../apis/Api";

export default function DonationManagement() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    fullName: "",
    currentAddress: "",
    isAvailable: "",
    isADonor: "",
    bloodGroup: "",
  });

  useEffect(() => {
    getAllUserApi()
      .then((res) => {
        if (currentUser.isAdmin === true) {
          const formattedUsers = res.data.users.map((user) => {
            const dateOfBirth = new Date(user.dob);
            const formattedDateOfBirth = `${dateOfBirth.getDate()}/${
              dateOfBirth.getMonth() + 1
            }/${dateOfBirth.getFullYear()}`;
            return { ...user, dob: formattedDateOfBirth };
          });
          setUsers(formattedUsers);
        } else {
          const formattedUsers = res.data.userListForBloodBank.map((user) => {
            const dateOfBirth = new Date(user.dob);
            const formattedDateOfBirth = `${dateOfBirth.getDate()}/${
              dateOfBirth.getMonth() + 1
            }/${dateOfBirth.getFullYear()}`;
            return { ...user, dob: formattedDateOfBirth };
          });
          setUsers(formattedUsers);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const applyFilters = (users) => {
    return users.filter((user) => {
      return Object.keys(filters).every((key) => {
        if (!filters[key]) return true;
        if (key === "isAvailable" || key === "isADonor") {
          return user[key] === (filters[key] === "true");
        }
        return user[key]
          ?.toString()
          .toLowerCase()
          .includes(filters[key].toLowerCase());
      });
    });
  };

  const filteredUsers = applyFilters(users);

  return (
    <div
      className="background"
      style={{
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div
        className="container content"
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          padding: "20px",
        }}
      >
        <h2 className="text-center">All the Donations</h2>

        <div className="flex w-100 my-4 gap-2">
          <input
            className="w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={filters.fullName}
          />
          <input
            className="w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
            type="text"
            placeholder="Current Address"
            name="currentAddress"
            value={filters.currentAddress}
          />
          <select
            className="w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
            name="isAvailable"
            value={filters.isAvailable}
          >
            <option value="">Is Available</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          {users.isAdmin ? (
            <select
              className="w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
              name="isADonor"
              value={filters.isADonor}
            >
              <option value="">Is A Donor</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          ) : null}
          <select
            className="w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
            name="bloodGroup"
            value={filters.bloodGroup}
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <div className="table-responsive overflow-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <thead className="bg-[#8BC53E] text-white">
              <tr>
                <th className="py-2 px-4 text-left">Fullname</th>
                <th className="py-2 px-4 text-left">Username</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Number</th>
                <th className="py-2 px-4 text-left">Address</th>
                <th className="py-2 px-4 text-left">Donation To</th>
                <th className="py-2 px-4 text-left">Category</th>
                <th className="py-2 px-4 text-left">Items</th>
                <th className="py-2 px-4 text-left">Quantity</th>
                <th className="py-2 px-4 text-left">Preferred Date/Time</th>
                <th className="py-2 px-4 text-left">Donation Method</th>
                <th className="py-2 px-4 text-left">Image</th>
                <th className="py-2 px-4 text-left">Donation Status</th>
                <th className="py-2 px-4 text-left">DOB</th>
                <th className="py-2 px-4 text-left">Blood Group</th>
                <th className="py-2 px-4 text-left">No Previous Donation</th>
                <th className="py-2 px-4 text-left">Emergency Number</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-2 px-4">{item.fullName || "Null"}</td>
                  <td className="py-2 px-4">{item.email || "Null"}</td>
                  <td className="py-2 px-4">{item.number || "Null"}</td>
                  <td className="py-2 px-4">{item.currentAddress || "Null"}</td>
                  {item.isAvailable ? (
                    <td className="py-2 px-4 text-green-500 font-semibold">
                      Yes
                    </td>
                  ) : (
                    <td className="py-2 px-4 text-red-500 font-semibold">No</td>
                  )}
                  {item.isADonor ? (
                    <td className="py-2 px-4 text-green-500 font-semibold">
                      Yes
                    </td>
                  ) : (
                    <td className="py-2 px-4 text-red-500 font-semibold">No</td>
                  )}
                  <td className="py-2 px-4">{item.gender || "Null"}</td>
                  <td className="py-2 px-4">{item.dob || "Null"}</td>
                  <td className="py-2 px-4">{item.bloodGroup || "Null"}</td>
                  <td className="py-2 px-4">
                    {item.noPreviousDonation || "Null"}
                  </td>
                  <td className="py-2 px-4">
                    {item.emergencyNumber || "Null"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
