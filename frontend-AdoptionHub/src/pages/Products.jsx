import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProductApi, getAllProductCatApi } from "../apis/Api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [prodCat, setProdCat] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    <div className="p-8 bg-white">
      <div className="flex flex-row justify-center w-full">
        <div className="w-5/6">
          <h1 className="text-4xl font-bold text-center mb-6">
            Pamper Your Pet with <span className="text-[#FF8534]">Tasty</span>{" "}
            Treats
          </h1>
          <h1 className="text-xl font-bold text-center">
            Because your Pet deserves it..
          </h1>
        </div>
        <div className="flex flex-row justify-end">
          <Link>
            <img className="h-16" src="assets/images/Category.svg" alt="" />
          </Link>
        </div>
      </div>
      <div className="flex overflow-x-auto py-4 justify-center space-x-4">
        <div
          id="category"
          className="flex flex-col justify-between cursor-pointer"
          onClick={() => handleCategoryClick(null)}
        >
          <img className="h-32" src="assets/images/Vector.svg" alt="" />
          <span>All Products</span>
        </div>
        {prodCat?.map((pro, index) => (
          <div
            key={pro._id}
            className="flex flex-col justify-end cursor-pointer"
            onClick={() => handleCategoryClick(pro.productCategory)}
          >
            <img
              src={pro?.productCategoryImageUrl}
              alt={`Image ${index + 1}`}
              className="h-32 w-32 rounded-full object-cover"
            />
            <h1 className="text-center mt-2">{pro.productCategory}</h1>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="relative border p-4 rounded-lg shadow-md"
          >
            <img
              src={product.productImageUrl}
              alt={product.name}
              className="h-52 w-full object-cover mb-3"
            />
            <div className="absolute right-0 flex flex-row justify-end p-1">
              <button className="bg-[#FF8534] hover:bg-[#F24E1E] border-2 border-black text-white font-bold py-2 px-4 rounded">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
