import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { createApplication } from "../../apis/Api";

const ListThePet = ({isOpen, onClose }) => {
  const [ownership, setOwnership] = useState("found");
  const [isLoading, setIsLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [petType, setPetType] = useState("");
  const [petAge, setPetAge] = useState("");
  const [petGender, setPetGender] = useState("");
  const [condition, setCondition] = useState("");
  const [purpose, setPurpose] = useState("");
  const [description, setDescription] = useState("");
  const [petImageUrlOne, setPetImageUrlOne] = useState(null);
  const [petImageUrlTwo, setPetImageUrlTwo] = useState(null);
  const [petImageUrlThree, setPetImageUrlThree] = useState(null);
  const [petImageUrlFour, setPetImageUrlFour] = useState(null);
  const [petImageUrlFive, setPetImageUrlFive] = useState(null);
  const [petFileUrl, setPetFileUrl] = useState(null);
  const [previewImageOne, setPreviewImageOne] = useState("");
  const [previewImageTwo, setPreviewImageTwo] = useState("");
  const [previewImageThree, setPreviewImageThree] = useState("");
  const [previewImageFour, setPreviewImageFour] = useState("");
  const [previewImageFive, setPreviewImageFive] = useState("");

  const handleCloseClick = (e) => {
    e.stopPropagation(); // Stop the event from propagating further
    console.log("close");
    onClose(); // Close the modal
  };

  // functio for image upload
  const handleImageUploadOne = (event) => {
    const file = event.target.files[0]; //files not file
    setPetImageUrlOne(file);
    setPreviewImageOne(URL?.createObjectURL(file));
  };

  const handleImageUploadTwo = (event) => {
    const file = event.target.files[0]; //files not file
    setPetImageUrlTwo(file);
    setPreviewImageTwo(URL?.createObjectURL(file));
  };

  const handleImageUploadThree = (event) => {
    const file = event.target.files[0]; //files not file
    setPetImageUrlThree(file);
    setPreviewImageThree(URL?.createObjectURL(file));
  };

  const handleImageUploadFour = (event) => {
    const file = event.target.files[0]; //files not file
    setPetImageUrlFour(file);
    setPreviewImageFour(URL?.createObjectURL(file));
  };

  const handleImageUploadFive = (event) => {
    const file = event.target.files[0];
    setPetImageUrlFive(file);
    setPreviewImageFive(URL?.createObjectURL(file));
  };
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPetFileUrl(file); // Storing the File object directly
    }
  };

  const handleFoundSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("number", phoneNumber);
    formData.append("address", address);
    formData.append("petType", petType);
    formData.append("condition", condition);
    formData.append("purpose", purpose);
    formData.append("description", description);
    formData.append("petImageUrlOne", petImageUrlOne);
    formData.append("petImageUrlTwo", petImageUrlTwo);
    formData.append("petImageUrlThree", petImageUrlThree);
    formData.append("petImageUrlFour", petImageUrlFour);
    formData.append("status", "found");
    createApplication(formData)
      .then((res) => {
        console.log(res);
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        toast.error("Server Error");
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleOwnSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("number", phoneNumber);
    formData.append("address", address);
    formData.append("petType", petType);
    formData.append("petAge", petAge);
    formData.append("petGender", petGender);
    formData.append("condition", condition);
    formData.append("purpose", purpose);
    formData.append("description", description);
    formData.append("petImageUrlFive", petImageUrlFive);
    formData.append("petFileUrl", petFileUrl);

    formData.append("status", "own");

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    createApplication(formData)
      .then((res) => {
        console.log(res);
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        toast.error("Server Error");
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleOwnershipChange = (status) => {
    setOwnership(status);
  };

  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 overflow-y-scroll">
      <div className="bg-white mt-16 p-6 rounded-lg shadow-lg max-w-4xl w-full overflow-y-scroll">
        <div className="flex flex-row justify-between items-center mb-4">
          <h2 className="text-xl text-left font-bold">Application Form</h2>
          <Link
            className="bg-red-600 hover:bg-red-800 rounded-md px-3 py-1"
            onClick={handleCloseClick}
          >
            <FontAwesomeIcon icon={faClose} />
          </Link>
        </div>
        <div className="flex flex-row justify-end mb-4">
          <div className="flex flex-row border-1 gap-2 rounded-lg p-1 border-gray-700">
            <button
              className={`px-4 py-2 rounded ${
                ownership === "found" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => handleOwnershipChange("found")}
            >
              I found the pet
            </button>
            <button
              className={`px-4 py-2 rounded ${
                ownership === "own" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => handleOwnershipChange("own")}
            >
              I own the pet
            </button>
          </div>
        </div>
        {ownership === "found" ? (
          <form onSubmit={handleFoundSubmit}>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <input
                type="text"
                placeholder="Full Name"
                onChange={(e) => setFullName(e.target.value)}
                className="input bg-gray-100 p-2 rounded border"
              />
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="input bg-gray-100 p-2 rounded border"
              />
              <input
                type="number"
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone Number"
                className="input bg-gray-100 p-2 rounded border"
              />
              <input
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
                className="input bg-gray-100 p-2 rounded border"
              />
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <h1 className="col-span-3 font-bold"> Pet Information </h1>
              <input
                type="text"
                onChange={(e) => setPetType(e.target.value)}
                placeholder="Type"
                className="input bg-gray-100 p-2 rounded border"
              />
              <input
                type="text"
                onChange={(e) => setCondition(e.target.value)}
                placeholder="Condition"
                className="input bg-gray-100 p-2 rounded border"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 mb-4">
              <textarea
                rows={4}
                type="text"
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="Purpose"
                className="input bg-gray-100 p-2 rounded border"
              />
              <textarea
                rows={4}
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="input bg-gray-100 p-2 rounded border"
              />
            </div>
            <div className="mb-4">
              <h3 className="font-bold mb-2 col-span-3">Other Information</h3>
              <label className="flex flex-row">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUploadOne}
                  className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100
                "
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUploadTwo}
                  className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUploadThree}
                  className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100
                "
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUploadFour}
                  className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100
                "
                />
              </label>
              <>
                <div className="flex flex-row gap-16">
                  {previewImageOne && (
                    <div className="mt-4">
                      <img src={previewImageOne} className="w-36 rounded-md" />
                    </div>
                  )}

                  {previewImageTwo && (
                    <div className="mt-4">
                      <img src={previewImageTwo} className="w-36 rounded-md" />
                    </div>
                  )}

                  {previewImageThree && (
                    <div className="mt-4">
                      <img
                        src={previewImageThree}
                        className="w-36 rounded-md"
                      />
                    </div>
                  )}

                  {previewImageFour && (
                    <div className="mt-4">
                      <img src={previewImageFour} className="w-36 rounded-md" />
                    </div>
                  )}
                </div>
              </>
            </div>
            <button
            type="submit"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOwnSubmit}>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder="Full Name"
                onChange={(e) => setFullName(e.target.value)}
                className="input bg-gray-100 p-2 rounded border"
              />
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="input bg-gray-100 p-2 rounded border"
              />
              <input
                type="text"
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
                className="input bg-gray-100 p-2 rounded border"
              />
              <input
                type="number"
                placeholder="Phone Number"
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="input bg-gray-100 p-2 rounded border"
              />
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <h3 className="font-bold col-span-3">Pet Information</h3>
              <input
                type="text"
                onChange={(e) => setPetType(e.target.value)}
                placeholder="Type"
                className="input bg-gray-100 p-2 rounded border"
              />
              <input
                type="text"
                onChange={(e) => setPetAge(e.target.value)}
                placeholder="Age"
                className="input bg-gray-100 p-2 rounded border"
              />
              <input
                type="text"
                onChange={(e) => setPetGender(e.target.value)}
                placeholder="Gender"
                className="input bg-gray-100 p-2 rounded border"
              />
              <input
                type="text"
                onChange={(e) => setCondition(e.target.value)}
                placeholder="Condition"
                className="input bg-gray-100 p-2 rounded border"
              />
              <textarea
                placeholder="Purpose"
                onChange={(e) => setPurpose(e.target.value)}
                rows={3}
                className="input bg-gray-100 p-2 col-span-3 rounded border"
              ></textarea>
              <textarea
                rows={3}
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
                className="input bg-gray-100 p-2 col-span-3 rounded border"
              ></textarea>
            </div>
            <div className="mb-4">
              <h3 className="font-bold mb-4">Other Information</h3>
              <div className="flex flex-row justify-between">
                <label className="block mb-2">
                  <span className="sr-only">Choose Photo:</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUploadFive}
                    className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100
                "
                  />
                </label>
                {previewImageFive && (
                <div className="mt-4">
                  <img src={previewImageFive} className="w-36 rounded-md" />
                </div>
              )}
                <label className="block">
                  <span className="sr-only">Choose File:</span>
                  <input
                    onChange={handleFileUpload}
                    type="file"
                    accept="application/pdf"
                    className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100
                  "
                  />
                </label>
              </div>

            </div>
            <button
            type="submit"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ListThePet;
