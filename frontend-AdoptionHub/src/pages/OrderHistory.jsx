import React, { useEffect, useState } from 'react'
import { getOrder } from '../apis/Api';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import UpNavbar from '../components/UpNavbar';

const OrderHistory = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const id = user._id;
  const [orders, setOrders] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    getOrder(id)
      .then((res) => {
        console.log('API Response:', res.data);
        setOrders(res.data.orders);
      })
      .catch((err) => {
        toast.error('Server Error');
        console.log(err.message);
      });
  }, [id]);

  // Organize orders based on orderId
  const organizedOrders = {};
  orders.forEach((order) => {
    if (!organizedOrders[order.orderId]) {
      organizedOrders[order.orderId] = [];
    }
    const existingItem = organizedOrders[order.orderId].find(
      (item) => item.plantId._id === order.plantId._id
    );
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      organizedOrders[order.orderId].push({ ...order, quantity: 1 });
    }
  });

 
  return (
    <div>
      <>
        <UpNavbar />
        <div>
          <Navbar />
        </div>
        <div className="cart-container">
          <div className="cart-items">
            <div className="cart-container">
              {Object.keys(organizedOrders).map((orderId) => (
                <div key={orderId}>
                  <h2>Order ID: {orderId}</h2>
                  <table className="table mt-2 table-bordered">
                    <thead className="table-light">
                      <tr>
                        <th> Product Image</th>
                        <th>Product Name</th>
                        {/* <th>Price</th> */}
                        {/* <th>Quantity</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {organizedOrders[orderId].map((item) => (
                        <tr key={item._id}>
                          <td>
                            <img
                              src={item.plantId.plantImageUrl}
                              alt={item.plantId.plantName}
                              style={{ width: '50px', height: '50px' }}
                            />
                          </td>
                           <td>{item.plantId.plantName}</td>
                          {/* <td>NPR.{parseFloat(item.plantId.plantPrice).toFixed(2)}</td>  */}
                          {/* <td>{item.quantity}</td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
              {Object.keys(organizedOrders).length === 0 && (
                <p>Your Order History is empty</p>
              )}
              {/* Display total quantity and price at the end of each order */}
              <div>
                {/* <p>Total Quantity: {totalQuantity}, Total Price: NPR. {totalPrice}</p> */}
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};


export default OrderHistory;