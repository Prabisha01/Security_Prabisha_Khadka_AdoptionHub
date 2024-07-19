import {
  faEdit,
  faExclamationTriangle,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createProductApi,
  deleteProductApi,
  getAllProductApi,
  getAllProductCatApi,
} from "../../apis/Api";

export default function ProductManagement() {
  const users = JSON.parse(localStorage.getItem("user"));

  const [products, setProducts] = useState([]);
  const [productsCat, setProductsCat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [filterProductName, setFilterProductName] = useState("");
  const [filterProductPrice, setFilterProductPrice] = useState("");
  const [filterProductCategory, setFilterProductCategory] = useState("");
  const [filterProductDescription, setFilterProductDescription] = useState("");

  const fetchproducts = async () => {
    try {
      const response = await getAllProductApi();
      setProducts(response?.data?.products);
      console.log(response?.data?.products);
      await getAllProductCatApi().then((res) => {
        console.log(res);
        setProductsCat(res?.data?.productCategory);
      });
    } catch (error) {
      console.error("Error Fetching products", error);
    }
  };

  useEffect(() => {
    fetchproducts();
  }, []);

  const [productName, setproductName] = useState("");
  const [productPrice, setproductPrice] = useState("");
  const [productCategory, setproductCategory] = useState("");
  const [productDescription, setproductDescription] = useState("");
  const [productImageUrl, setproductImageUrl] = useState(null);

  const [isdeleteModalOpen, setdeleteIsModalOpen] = useState(false);
  const opendeleteModal = () => setdeleteIsModalOpen(true);
  const closedeleteModal = () => setdeleteIsModalOpen(false);
  const [proII, setProII] = useState("");

  const changeproductName = (e) => {
    setproductName(e.target.value);
  };
  const changeproductDescription = (e) => {
    setproductDescription(e.target.value);
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setproductImageUrl(file);
    setImagePreview(URL?.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // making logical form data
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("productCategory", productCategory);
    formData.append("productDescription", productDescription);
    formData.append("productImageUrl", productImageUrl);
    // making Api call
    createProductApi(formData)
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
    deleteProductApi(id).then((res) => {
      if (res?.data?.success == true) {
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

  const filterProducts = () => {
    return products.filter((product) => {
      return (
        (filterProductName === "" || product.productName.toLowerCase().includes(filterProductName.toLowerCase())) &&
        (filterProductPrice === "" || product.productPrice.toString().includes(filterProductPrice)) &&
        (filterProductCategory === "" || product.productCategory.productCategory.toLowerCase().includes(filterProductCategory.toLowerCase())) &&
        (filterProductDescription === "" || product.productDescription.toLowerCase().includes(filterProductDescription.toLowerCase()))
      );
    });
  };

  return (
    <>
      <div className="w-full sm:px-6">
        {users.isAdmin ? (
          <div className="px-4 md:px-10 py-2 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
            <div className="sm:flex flex-row items-center justify-between">
              <p className="inline-flex sm:ml-3  sm:mt-0 items-start justify-start px-6 py-3  text-black focus:outline-none rounded">
                Products
              </p>
              <div>
                <button
                  className="inline-flex sm:ml-3 mt-1 sm:mt-0 items-start justify-start px-6 py-3 bg-[#FF8534] hover:bg-[#F24E1E] text-white focus:outline-none rounded"
                  onClick={openModal}
                >
                  Add Products
                </button>
              </div>
            </div>
          </div>
        ) : null}
        <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
          <div className="flex flex-col items-center justify-center md:flex-row md:items-start md:justify-between md:gap-4 mb-4 w-full">
            <div className="flex w-100 my-4 gap-2">
              <input
                className="w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                type="text"
                name="filterProductName"
                placeholder="Filter by product Name"
                value={filterProductName}
                onChange={(e) => setFilterProductName(e.target.value)}
              />
              <input
                className="w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                type="text"
                name="filterProductPrice"
                placeholder="Filter by product Price"
                value={filterProductPrice}
                onChange={(e) => setFilterProductPrice(e.target.value)}
              />
              <input
                className="w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                type="text"
                name="filterProductCategory"
                placeholder="Filter by product Category"
                value={filterProductCategory}
                onChange={(e) => setFilterProductCategory(e.target.value)}
              />
              <input
                className="w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                type="text"
                name="filterProductDescription"
                placeholder="Filter by product Description"
                value={filterProductDescription}
                onChange={(e) => setFilterProductDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full bg-white overflow-y-auto">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="h-16 w-full text-sm leading-none text-gray-800">
                  <th className="font-normal text-left pl-4">Product Image</th>
                  <th className="font-normal text-left pl-4">Product Name</th>
                  <th className="font-normal text-left pl-12">Product Price</th>
                  <th className="font-normal text-left pl-12">Category</th>
                  <th className="font-normal text-left pl-12">Description</th>
                  <th className="font-normal text-left pl-12">
                    <button className="focus:outline-none">
                      Created Date
                      <span className="ml-1"></span>
                    </button>
                  </th>
                  {users?.isOrganization ? null : (
                    <th className="font-normal text-left pl-16">Action</th>
                  )}
                </tr>
              </thead>
              <tbody className="w-full">
                {filterProducts().map((item) => (
                  <tr
                    key={item._id}
                    className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                  >
                    <td className="pl-4 cursor-pointer">
                      <div className="flex items-center">
                        <div className="w-10 h-10">
                          <img
                            className="w-full h-full"
                            src={item.productImageUrl}
                            alt="Thumbnail Image"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="pl-12">
                      <p className="text-sm font-medium leading-none text-gray-800">
                        {item.productName}
                      </p>
                    </td>
                    <td className="pl-12">
                      <p className="font-medium">{item.productPrice}</p>
                    </td>
                    <td className="pl-12">
                      <p className="font-medium">{item.productCategory.productCategory}</p>
                    </td>
                    <td className="pl-12">
                      <p className="font-medium">{item.productDescription}</p>
                    </td>
                    <td className="pl-20 overflow-y max-w-[200px] truncate">
                      <p className="font-medium">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </td>

                    <td className="px-7 2xl:px-0">
                      {/* Edit Button */}
                      <Link
                        className="focus:outline-none py-2 px-4"
                        to={`/edit-product/${item._id}`}
                      >
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="text-blue-500 hover:text-blue-700 cursor-pointer"
                        />
                      </Link>

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
            <div className="relative top-32 mx-auto p-5 border w-1/2 shadow-lg rounded-md bg-white">
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
                  Add New product
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900">
                      Product Name
                    </label>
                    <input
                      onChange={changeproductName}
                      type="text"
                      className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900">
                      Product Price
                    </label>
                    <input
                      onChange={(e) => setproductPrice(e.target.value)}
                      type="number"
                      min={0}
                      className="mt-1 block w-full  border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900">
                      Product Type
                    </label>
                    <select
                      onChange={(e) => setproductCategory(e.target.value)}
                      className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                      required>
                      <option value="">Select Product Category</option>
                        {productsCat?.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.productCategory}
                          </option>
                        ))}
                      </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900">
                      Product Description
                    </label>
                    <textarea
                      onChange={changeproductDescription}
                      className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm"
                      rows="4"
                      required
                    ></textarea>
                  </div>
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
