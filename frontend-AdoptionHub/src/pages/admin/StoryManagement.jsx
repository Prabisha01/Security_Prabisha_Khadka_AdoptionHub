import {
  faExclamationTriangle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteStoryApi, getAllStoryApi } from "../../apis/Api";

export default function StoryManagement() {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isdeleteModalOpen, setdeleteIsModalOpen] = useState(false);
  const opendeleteModal = () => setdeleteIsModalOpen(true);
  const closedeleteModal = () => setdeleteIsModalOpen(false);
  const [sId, setSId] = useState("");

  const [filterName, setFilterName] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [filterStory, setFilterStory] = useState("");

  const handleDelete = (id) => {
    deleteStoryApi(id).then((res) => {
      if (res.data.success === true) {
        closedeleteModal();
        toast.success(res.data.message);
        fetchAllStories();
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const fetchAllStories = () => {
    getAllStoryApi().then((res) => {
      setStories(res?.data?.story);
    });
  };

  useEffect(() => {
    fetchAllStories();
  }, []);

  const filterStories = () => {
    return stories.filter((story) => {
      return (
        (filterName === "" || story.fullName.toLowerCase().includes(filterName.toLowerCase())) &&
        (filterEmail === "" || story.email.toLowerCase().includes(filterEmail.toLowerCase())) &&
        (filterStory === "" || story.story.toLowerCase().includes(filterStory.toLowerCase()))
      );
    });
  };

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
        className=""
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          padding: "20px",
        }}
      >
        <h2 className="text-center mb-4">All The Stories</h2>
        <div className="flex flex-col items-center justify-center md:flex-row md:items-start md:justify-between md:gap-4 mb-4 w-full">
          <input
            className="w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5 mb-4"
            type="text"
            name="filterName"
            placeholder="Filter by Name"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
          />
          <input
            className="w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5 mb-4"
            type="text"
            name="filterEmail"
            placeholder="Filter by Email"
            value={filterEmail}
            onChange={(e) => setFilterEmail(e.target.value)}
          />
          <input
            className="w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5 mb-4"
            type="text"
            name="filterStory"
            placeholder="Filter by Story"
            value={filterStory}
            onChange={(e) => setFilterStory(e.target.value)}
          />
        </div>
        <div className="w-full bg-white overflow-y-auto">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="h-16 w-full text-sm leading-none text-gray-800">
                <th className="font-normal text-left pl-12">Image</th>
                <th className="font-normal text-left pl-12">Full Name</th>
                <th className="font-normal text-left pl-12">Email</th>
                <th className="font-normal text-left pl-12">Story</th>
                <th className="font-normal text-left pl-12">Action</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {filterStories().map((item) => (
                <tr
                  key={item._id}
                  className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                >
                  <td className="pl-12 cursor-pointer">
                    <div className="flex items-center">
                      <div className="w-10 h-10">
                        <img
                          className="w-full h-full"
                          src={item.storyImageUrl}
                          alt="Thumbnail Image"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="pl-12">
                    <p className="font-medium">{item.fullName}</p>
                  </td>
                  <td className="pl-12">
                    <p className="font-medium">{item.email}</p>
                  </td>
                  <td className="pl-12">
                    <p className="font-medium">{item.story}</p>
                  </td>
                  <td className="pl-12">
                    <button
                      onClick={() => {
                        opendeleteModal();
                        setSId(item._id);
                      }}
                      className="focus:outline-none ml-2 "
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-red-500 hover:text-red-700 cursor-pointer "
                      />
                    </button>
                  </td>
                  {isdeleteModalOpen && (
                    <div
                      className="fixed inset-0 flex items-center justify-center bg-opacity-20 overflow-y-auto h-full w-full"
                      id="my-modal"
                    >
                      <div className="relative mx-auto p-5 border shadow-sm w-1/4 rounded-md bg-white space-y-8 justify-center items-center flex flex-col">
                        <h6 className="font-medium w-3/4 mx-auto text-center">
                          <FontAwesomeIcon
                            className="me-4"
                            icon={faExclamationTriangle}
                          />
                          <img
                            src="../assets/images/sure_about_that.jpg"
                            alt=""
                          />
                          Are you sure about that 👁️👁️?
                        </h6>
                        <div className="flex flex-wrap items-center justify-between mx-auto w-full">
                          <button
                            onClick={() => handleDelete(sId)}
                            className="w-1/3 text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center py-2.5"
                          >
                            Delete
                          </button>
                          <button
                            type="submit"
                            className="w-1/3 text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5"
                            onClick={closedeleteModal}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
