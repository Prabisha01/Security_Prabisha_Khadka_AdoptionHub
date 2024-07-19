import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { createStoryApi } from "../../apis/Api";

const ShareStory = ({ isOpen, onClose }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [story, setStory] = useState("");
  const [storyImageUrl, setStoryImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setStoryImageUrl(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleStorySubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("story", story);
    formData.append("storyImageUrl", storyImageUrl);
    formData.append("user", user?._id);

    createStoryApi(formData)
      .then((res) => {
        if (res.data.success) {
          setLoading(false);
          toast.success(res.data.message);
          onClose();
        } else {
          setLoading(false);
          toast.error(res.data.message);
        }
      })
      .catch(() => {
        setLoading(false);
        toast.error("Server Error");
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="relative bg-white rounded-lg shadow-lg border border-black w-full max-w-[1102px] mx-4 p-6" style={{ borderRadius: '25px' }}>
        <button
          onClick={onClose}
          className="absolute"
          style={{ top: '29px', right: '27px', fontSize: '1.5rem', color: 'black' }}
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Poppins', fontSize: '30px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'left' }}>
          <span className="text-[#FF8534]">Share</span> with Us
        </h2>
        <form className="grid gap-6" style={{ gridTemplateColumns: '1fr 1fr', width: '100%' }}>
          <input
            placeholder="Full Name"
            type="text"
            onChange={(e) => setFullName(e.target.value)}
            className="pl-4 py-2 border border-black rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950"
            style={{ color: 'black', height: '62px', borderRadius: '10px', fontSize: '16px' }}
          />
          <input
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="pl-4 py-2 border border-black rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950"
            style={{ color: 'black', height: '62px', borderRadius: '10px', fontSize: '16px' }}
          />
          <textarea
            placeholder="Your Story"
            onChange={(e) => setStory(e.target.value)}
            className="pl-4 py-2 border border-black rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950"
            style={{ color: 'black', height: '200px', borderRadius: '10px', fontSize: '16px', gridColumn: '1 / 3' }}
          ></textarea>
          <div className="flex items-center" style={{ gridColumn: '1 / 3', width: '295px' }}>
            <div className="flex justify-between items-center border border-dashed border-gray-500 rounded-md p-4" style={{ height: '62px', width: '100%' }}>
              <label className="block w-full flex items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                />
              </label>
            </div>
            <span className="text-red-500 text-sm ml-4">PNG/JPG/JPEG Only</span>
          </div>
          <div className="text-sm text-gray-500 mt-2" style={{ gridColumn: '1 / 3', textAlign: 'left' }}>
            Note: Only one image is accepted
          </div>
          {preview && (
            <div className="mt-4" style={{ textAlign: 'center', gridColumn: '1 / 3' }}>
              <img src={preview} alt="Preview" className="inline-block" style={{ width: '317px', height: '203px', borderRadius: '10px' }} />
            </div>
          )}
        </form>
        <button
          onClick={handleStorySubmit}
          className="bg-[#FF8534] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline border-black border"
          type="button"
          style={{ height: '62px', width: '441px', borderRadius: '10px', fontSize: '22px', fontWeight: '800', transition: 'background-color 500ms ease, border 500ms ease', marginTop: '10px' }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#FF7148";
            e.target.style.border = "2px solid black";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#FF8534";
            e.target.style.border = "none";
          }}
        >
          {loading ? (
            <CircularProgress color={"inherit"} size={20} />
          ) : (
            "Share"
          )}
        </button>
      </div>
    </div>
  );
};

export default ShareStory;
