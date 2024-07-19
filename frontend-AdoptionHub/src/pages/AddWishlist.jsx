import React, { useEffect, useState } from "react";
import {
  getWishlistApi,
  removeFromWishlistApi,
} from "../apis/Api";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import UpNavbar from "../components/UpNavbar";
import { Link } from "react-router-dom";
import wall from "../images/wall.jpg";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const Wishlist = () => {
  const bgImage = {
    backgroundImage: `url(${wall})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "81vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const [wishlists, setWishlist] = useState([]);
  const storedUserData = localStorage.getItem("user");
  const parsedUserData = JSON.parse(storedUserData);
  const userId = parsedUserData._id;

  useEffect(() => {
    getWishlistApi(userId).then((res) => {
      setWishlist(res.data.wishlists);
    });
  }, [userId]);

  const handleDeleteWhislist = (id) => {
    const confirmDialog = window.confirm(
      "Are you sure you want to remove the item from the wishlist?"
    );
    if (!confirmDialog) {
      return;
    } else {
      removeFromWishlistApi(id).then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          window.location.reload();
        } else {
          toast.error(res.data.message);
        }
      });
    }
  };

  return (
    <>
      <div>
        <UpNavbar />
      </div>
      <div>
        <Navbar />
        <div style={bgImage}></div>
        <div
          style={{
            position: "fixed",
            top: "80px",
            right: "350px",
            borderRadius: "8px",
            width: "900px",
            border: "2px solid green",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "4px",
            }}
          >
            <h1
              style={{
                color: "green",
                fontSize: "2em",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              Wishlist
            </h1>
          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "0 0 8px 8px",
            }}
          >
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Plant Image</th>
                  <th>Plant Name</th>
                  <th>Plant Category</th>
                  <th>Plant Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {wishlists.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <img
                        src={item.plantId ? item.plantId.plantImageUrl : ""}
                        alt="Plant"
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      />
                    </td>
                    <td>{item.plantId ? item.plantId.plantName : "N/A"}</td>
                    <td>{item.plantId ? item.plantId.plantCategory : "N/A"}</td>
                    <td>${item.plantId ? item.plantId.plantPrice : "N/A"}</td>
                    <td>
                      <button
                        className="btn btn-danger "
                        style={{ transition: "0.3s" }}
                        onClick={() => handleDeleteWhislist(item._id)}
                      >
                         <DeleteOutlineIcon />
                      </button>
                      {/* Add to Cart button can be added here */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-flex justify-content-end">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
