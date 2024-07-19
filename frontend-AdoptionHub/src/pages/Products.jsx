import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addToCartApi,
  getAllProductApi,
  getAllProductCatApi,
} from "../apis/Api";
import useAuthCheck from "../components/IsAuthenticated";
import ProductModal from "./ProductModel";

const Products = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [products, setProducts] = useState([]);
  const [prodCat, setProdCat] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState([]);

  const openProductModal = (selectedProduct) => {
    setSelectedProduct(selectedProduct);
    setIsProductModalOpen(true);
  };

  const closeProductModal = () => {
    setIsProductModalOpen(false);
    setSelectedProduct(null);
  };

  const fetchProducts = () => {
    setLoading(true);
    Promise.all([getAllProductApi(), getAllProductCatApi()])
      .then(([productsRes, categoriesRes]) => {
        setProducts(productsRes?.data?.products);
        setProdCat(categoriesRes?.data?.productCategory);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const verifyAuthBeforeAction = useAuthCheck();

  const addToCart = (id) => {
    verifyAuthBeforeAction(() => {
      const data = new FormData();
      data.append("products", id);
      data.append("user", user._id);
      data.append("quantity", 1);

      addToCartApi(data)
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    });
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = selectedCategory
    ? products.filter(
        (product) =>
          product.productCategory &&
          product.productCategory.productCategory === selectedCategory
      )
    : products;

  return (
    <div className="p-8 bg-white mt-28">
      <div className="flex flex-col items-center">
        <div className="w-full text-center">
          <h1 className="text-5xl font-bold mb-4">
            Pamper Your Pet with <span className="text-[#FF8534]">Tasty</span> Treats
          </h1>
        
          <h1 className="text-xl font-bold mb-6">Because your Pet deserves the best</h1>
        </div>
        <div className="flex flex-row justify-end w-full mb-6">
          {/* <Link to={"/my-cart"}>
            <img className="h-10" src="assets/images/Category.svg" alt="" style={{ width: "62px", height: "57px" }} />
          </Link> */}
        </div>
      </div>
      <div className="flex overflow-x-auto py-4 justify-center space-x-4 items-center">
        <div
          id="category"
          className={`flex flex-row items-center cursor-pointer ${!selectedCategory ? 'scale-110' : ''}`}
          onClick={() => handleCategoryClick(null)}
          style={{ marginRight: "79px" }}
        >
          <div className="h-10 w-10 overflow-hidden">
            <img className="object-cover h-full w-full" src="assets/images/Vector.svg" alt="" />
          </div>
          <span className="ml-4">All Products</span>
        </div>
        {prodCat?.map((pro, index) => (
          <div
            key={pro._id}
            className={`flex flex-col items-center cursor-pointer transition-transform duration-300 transform ${selectedCategory === pro.productCategory ? 'scale-110' : ''}`}
            onClick={() => handleCategoryClick(pro.productCategory)}
            style={{ width: "160px", height: "150px", marginRight: "79px" }}
          >
            <div className="h-32 w-32 rounded-full overflow-hidden">
              <img
                src={pro?.productCategoryImageUrl}
                alt={`Image ${index + 1}`}
                className="object-cover h-full w-full"
              />
            </div>
            <span className="text-center mt-2">{pro.productCategory}</span>
          </div>
        ))}
        <div className="flex flex-row justify-end">
          <Link to={"/my-cart"}>
            <img className="h-16" src="assets/images/Category.svg" alt="" />
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {filteredProducts.map((product) => (
          <div
            onClick={(e) => {
              e.preventDefault();
              openProductModal(product);
            }}
            key={product._id}
            className="relative border-2 border-black p-4 rounded-lg shadow-md cursor-pointer"
          >
            <img
              src={product.productImageUrl}
              alt={product.name}
              className="h-52 w-full object-cover mb-3"
            />
            <div className="flex flex-col items-center">
              <span className="text-lg font-semibold">{product.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product._id);
                }}
                className="absolute bottom- right-2 bg-[#FF8534] hover:bg-[#FFA500] border-2 border-black text-white font-bold py-2 px-4 rounded"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
        <ProductModal
          isOpen={isProductModalOpen}
          onClose={closeProductModal}
          product={selectedProduct}
          addToCart={addToCart}
        />
      </div>
    </div>
  );
};

export default Products;
