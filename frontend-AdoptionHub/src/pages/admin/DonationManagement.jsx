import React, { useEffect, useState } from "react";
import { allFundingsApi } from "../../apis/Api";

export default function DonationManagement() {
  const [fundings, setFundings] = useState([]);

  const fetchUsers = () => {
    allFundingsApi()
      .then((response) => {
        setFundings(response?.data?.funding);
      })
      .catch((err) => {
        
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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

        <div className="table-responsive overflow-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <thead className="bg-[#FF8534] text-white">
              <tr>
                <th className="py-2 px-4 text-left">User Image</th>
                <th className="py-2 px-4 text-left">FullName</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              {fundings?.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-2 px-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10">
                        <img
                          className="w-full h-full"
                          src={item?.user?.userImageUrl || "Null"}
                          alt="Adoption Image"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-4">
                    {item?.user?.fullName || "Null"}
                  </td>
                  <td className="py-2 px-4">{item?.user?.email || "Null"}</td>
                  <td className="py-2 px-4">{item?.amount || "Null"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}