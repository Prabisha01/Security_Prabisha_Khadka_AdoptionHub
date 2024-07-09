import React, { useEffect, useState } from "react";
import { getAllCartApi, removeCart, updateCart, createOrderApi } from "../apis/Api";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Navbar from "../components/Navbar";
import UpNavbar from "../components/UpNavbar";
import wall from "../images/wall.jpg";
import "../pages/Cart.css";
import { Modal, Button } from "react-bootstrap";

const Cart = () => {
  const bgImage = {
    backgroundImage: `url(${wall})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "81vh",
    position: "relative",
  };

  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user._id);

  const [quantity, setQuantity] = useState(1);
  const [plantPrice, setProductPrice] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [userId, setUserID] = useState("");
  const [cartId, setCartID] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [productID, setProductID] = useState("");
  const [order, setOrder] = useState("");
  const [carts, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [cartUpdated, setCartUpdated] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleProceedToCheckout = () => {
    // Perform cart update
    setCartUpdated(true);

    // Show confirmation dialogue
    setShowConfirmation(true);
  };
  const handleConfirmOrder = (e) => {
    e.preventDefault();
  
    const cartIds = carts.map((item) => item._id);
    const productIds = carts.map((item) => item.plantId._id);
    const quantities = carts.map((item) => item.quantity || 1);
  
    const formData = new FormData();
    formData.append("userId", user._id);
  
    // Append arrays of cart IDs, product IDs, quantities, and totalPrices
    cartIds.forEach((cartId, index) => {
      formData.append(`cartIds[${index}]`, cartId);
      formData.append(`productIds[${index}]`, productIds[index]);
      formData.append(`quantities[${index}]`, quantities[index]);
      formData.append(
        `totalPrices[${index}]`,
        (quantities[index] || 1) * carts[index].plantId.plantPrice
      );
    });
  
    const orderDate = new Date().toISOString();
    formData.append("orderDate", orderDate);
  
    createOrderApi(formData)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
  
          // Clear the cart locally
          setCart([]);
          // Set total to 0
          setTotal(0);
  
          // Close the confirmation dialogue
          setShowConfirmation(false);
        }
      })
      .catch((err) => {
        toast.error("Server Error");
        console.log(err.message);
      });
  };
  const handleCancelOrder = () => {
    // Close the confirmation dialogue
    setShowConfirmation(false);
  };

  useEffect(() => {
    calculateCartTotal();
  }, [carts]);

  useEffect(() => {
    getAllCartApi(user._id)
      .then((res) => {
        console.log("API Response:", res.data);
        setCart(res.data.carts);

        // Set initial quantity and productPrice from the first item in the cart
        if (res.data.carts && res.data.carts.length > 0) {
          setQuantity(res.data.carts[0].quantity || 1);
          setProductPrice(res.data.carts[0].plantID.plantPrice || 0);
        }
      })
      .catch((err) => {
        // toast.error("Server Error");
        console.log(err.message);
      });
  }, [user._id]);

  const calculateCartTotal = () => {
    let newSubtotal = 0;

    // Calculate subtotal based on the items in the cart
    carts.forEach((item) => {
      newSubtotal += (item.quantity || 1) * item.plantId.plantPrice;
    });

    // Set both subtotal and total to the calculated subtotal
    setSubtotal(newSubtotal);
    setTotal(newSubtotal);
  };

  const handleDelete = (id) => {
    const confirmDialog = window.confirm(
      "Are you sure, you want to remove from cart?"
    );
    if (!confirmDialog) {
      return;
    } else {
      removeCart(id)
        .then((res) => {
          if (res.data.success === true) {
            window.location.reload();
            toast.success(res.data.success);
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedCart = carts.map((item) =>
      item._id === itemId
        ? { ...item, quantity: Math.min(5, Math.max(1, newQuantity)) }
        : item
    );
    setCart(updatedCart);
    setCartUpdated(true);
  };

  useEffect(() => {
    if (cartUpdated) {
      const updatedProducts = carts.map((item) => ({
        plantId: item.plantId._id,
        quantity: item.quantity,
      }));

      updateCart(user._id, { products: updatedProducts })
        .then((res) => {
          console.log(res.data);
          setCartUpdated(false);
        })
        .catch((error) => {
          console.error(error.message);
          setCartUpdated(false);
        });
    }
  }, [cartUpdated, user._id]);

  return (
    <div>
      <UpNavbar />
      <div>
        <Navbar />
        <div style={bgImage}></div>
        <div
          className="cart-container"
          style={{
            position: "absolute",
            top: "80px",
            right: "350px",
            borderRadius: "8px",
            width: "900px",
            border: "2px solid green",
          }}
        >
          <div className="cart-items">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {carts.map((item) => (
                  <tr key={item._id}>
                    <td>{item.plantId.plantName}</td>
                    <td>
                      <img
                        src={item.plantId.plantImageUrl}
                        alt={item.plantId.plantName}
                        style={{ width: "100px", height: "80px" }}
                      />
                    </td>
                    <td>NPR.{item.plantId.plantPrice}</td>
                    <td>
                      <div className="quantity-container">
                        <button
                          className="quantity-button"
                          onClick={() =>
                            handleQuantityChange(item._id, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <input
                          className="item-quantity"
                          type="number"
                          min={1}
                          max={5}
                          value={item.quantity || 1}
                          onChange={(e) =>
                            handleQuantityChange(
                              item._id,
                              parseInt(e.target.value, 10)
                            )
                          }
                        />
                        <button
                          className="quantity-button"
                          onClick={() =>
                            handleQuantityChange(item._id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>
                      NPR.{(item.quantity || 1) * item.plantId.plantPrice}
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-danger"
                      >
                        <DeleteOutlineIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="cart-summary">
            <p className="total">Total: NPR.{total}</p>
            <Link
              type="close"
              className=" btn btn-outline-dark rounded-pill   me-4 mr-auto"
              style={{ transition: "0.3s" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "green")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "")}
              to={"/products"}
            >
              Close
            </Link>
            <Link
              type="close"
              className=" btn btn-outline-dark rounded-pill   me-4 mr-auto"
              style={{ transition: "0.3s" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "green")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "")}
              onClick={handleProceedToCheckout}
            >
              Proceed to Checkout
            </Link>
          </div>
          <Modal show={showConfirmation} onHide={handleCancelOrder} centered>
            <Modal.Header closeButton>
              <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Do you really want to place the order?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCancelOrder}>
                No
              </Button>
              <Button variant="primary" onClick={handleConfirmOrder}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Cart;
