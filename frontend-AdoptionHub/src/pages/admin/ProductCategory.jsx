import {
  faExclamationTriangle,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createProductCatApi,
  deleteProductCatApi,
  getAllProductCatApi,
} from "../../apis/Api";

export default function ProductCategory() {
  const users = JSON.parse(localStorage.getItem("user"));

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchproducts = async () => {
    try {
      const response = await getAllProductCatApi();
      setProducts(response?.data?.productCategory);
    } catch (error) {
      console.error("Error Fetching products", error);
    }
  };

  useEffect(() => {
    fetchproducts();
  }, []);

  const [productCategory, setproductCategory] = useState("");
  const [productCategoryImageUrl, setproductCategoryImageUrl] = useState(null);

  const [isdeleteModalOpen, setdeleteIsModalOpen] = useState(false);
  const opendeleteModal = () => setdeleteIsModalOpen(true);
  const closedeleteModal = () => setdeleteIsModalOpen(false);
  const [proII, setProII] = useState("");

  const changeproductCategory = (e) => {
    setproductCategory(e.target.value);
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setproductCategoryImageUrl(file);
    setImagePreview(URL?.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // making logical form data
    const formData = new FormData();
    formData.append("productCategory", productCategory);
    formData.append("productCategoryImageUrl", productCategoryImageUrl);

    // making Api call
    createProductCatApi(formData)
      .then((res) => {
        if (res.data.success == false) {
          toast.error(res.data.message);
        } else {
          closeModal();
          toast.success(res.data.message);
          fetchproducts();
        }
      })
      .catch((e) => {
        toast.error("Server Error");
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDelete = (id) => {
    deleteProductCatApi(id).then((res) => {
      if (res.data.success == true) {
        closedeleteModal(true);
        toast.success(res.data.message);
        fetchproducts();
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="w-full sm:px-6">
        {users.isAdmin ? (
          <div className="px-4 md:px-10 py-2 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
            <div className="sm:flex flex-row items-center justify-between">
              <p className="inline-flex sm:ml-3  sm:mt-0 items-start justify-start px-6 py-3  text-black focus:outline-none rounded">
                Products Category
              </p>
              <div>
                <button
                  className="inline-flex sm:ml-3 mt-1 sm:mt-0 items-start justify-start px-6 py-3 bg-[#FF8534] hover:bg-[#F24E1E] text-white focus:outline-none rounded"
                  onClick={openModal}
                >
                  Add Product Category
                </button>
              </div>
            </div>
          </div>
        ) : null}
        <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
          <div className="flex flex-col items-center justify-center md:flex-row md:items-start md:justify-between md:gap-4 mb-4 w-full">
            <div className="flex w-100 my-4 gap-2">
              <input
                className="w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                type="text"
                name="productName"
                placeholder="Filter by product Name"
              />
            </div>
          </div>

          <div className="w-full bg-white overflow-y-auto">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="h-16 w-full text-sm leading-none text-gray-800">
                  <th className="font-normal text-left pl-4">Product Image</th>
                  <th className="font-normal text-left pl-12">Category Name</th>
                </tr>
              </thead>
              <tbody className="w-full">
                {products?.map((item) => (
                  <tr
                    key={item._id}
                    className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                  >
                    <td className="pl-4 cursor-pointer">
                      <div className="flex items-center">
                        <div className="w-10 h-10">
                          <img
                            className="w-full h-full"
                            src={item.productCategoryImageUrl}
                            alt="Thumbnail Image"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="pl-12">
                      <p className="font-medium">{item.productCategory}</p>
                    </td>
                    <td className="px-7 2xl:px-0">
                      {/* Delete Button */}
                      <button
                        onClick={() => {
                          opendeleteModal();
                          setProII(item._id);
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
                        <div className="relative mx-auto p-5 border  shadow-sm w-1/4 rounded-md bg-white space-y-8 justify-center items-center flex flex-col">
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
                              onClick={() => handleDelete(proII)}
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
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
            id="my-modal"
          >
            <div className="relative top-52 mx-auto p-5 border w-1/2 shadow-lg rounded-md bg-white">
              {/* Close button */}
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  onClick={closeModal}
                  className="text-black bg-red-500 hover:bg-red-700 rounded-lg text-sm p-2"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>

              <form className="space-y-6">
                <h3 className=" leading-6 text-gray-900 text-center font-semibold text-2xl">
                  Add New product Category
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-2 mb-4">
                  <label className="block text-sm font-medium text-gray-900">
                    Category Name
                  </label>
                  <input
                    onChange={changeproductCategory}
                    type="text"
                    className="block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium  text-gray-900">
                    Product Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="mt-1 block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    onChange={handleImageUpload}
                    required
                  />
                  {imagePreview && (
                    <div className="mt-4">
                      <img
                        src={imagePreview}
                        className="w-[200px] rounded-md"
                      />
                    </div>
                  )}
                </div>
                <button
                  onClick={handleSubmit}
                  type="submit"
                  disabled={isLoading}
                  className="w-full text-white bg-[#FF8534] hover:bg-[#F24E1E] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  {isLoading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    "Add product"
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
