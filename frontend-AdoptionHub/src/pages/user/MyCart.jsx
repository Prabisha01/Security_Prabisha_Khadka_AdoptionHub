import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllCartApi, removeCartApi } from "../../apis/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function MyCart() {
  const [cartItems, setCartItems] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const fetchMyCartItems = () => {
    getAllCartApi(user._id)
      .then((res) => {
        setCartItems(res?.data?.carts);
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.message);
      });
  };

  useEffect(() => {
    fetchMyCartItems();
  }, []);

  const total = cartItems.reduce(
    (acc, item) => acc + item.products.productPrice * item.quantity,
    0
  );

  const handleQuantityChange = (id, delta) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + delta } : item
      )
    );
  };

  const handleRemove = (id) => {
    removeCartApi(id)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          fetchMyCartItems();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.message);
      });
  };

  const makePayment = () => {
    navigate("/payment", { state: { cartItems, total, user } });
  };

  return (
    <div className="mx-auto mb-32 p-4 mt-32 overflow-x-scroll">
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Product</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Sub Total</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item._id}>
              <td className="border px-4 py-2">{item.products.productName}</td>
              <td className="border px-4 py-2">
                <img
                  src={item.products.productImageUrl}
                  alt={item.products.productName}
                  className="h-20 w-20 object-cover"
                />
              </td>
              <td className="border px-4 py-2">{item.products.productPrice}</td>
              <td className="border px-4 py-2">
                <span className="!border-2 border-black flex flex-row justify-between">
                  <button
                    className="bg-gray-600 w-1/3 border-r-2 border-black hover:bg-gray-300  cursor-pointer px-2 mr-2"
                    onClick={() => handleQuantityChange(item._id, -1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  {item.quantity}
                  <button
                    className="bg-gray-600 w-1/3 border-l-2 border-black  hover:bg-gray-300 cursor-pointer px-2 ml-2"
                    onClick={() => handleQuantityChange(item._id, 1)}
                  >
                    +
                  </button>
                </span>
              </td>
              <td className="border px-4 py-2">
                {item.products.productPrice * item.quantity}
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={(e) => handleRemove(item._id)}
                  className="text-red-500"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-right mt-4">
        <strong>Total - {total.toFixed(2)}</strong>
      </div>
      <div className="flex flex-row justify-end">
        <button
          onClick={makePayment}
          className="bg-[#FF8534] hover:bg-[#F24E1E] text-white px-4 py-2 mt-4 rounded"
        >
          Proceed To Checkout
        </button>
      </div>
    </div>
  );
}

export default MyCart;
