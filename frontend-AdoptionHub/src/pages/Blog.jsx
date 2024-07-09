import React, { useEffect, useState } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";
import { getUserBlogPaginationApi, searchBlogsApi } from "../apis/Api";
import Navbar from "../components/Navbar";
import img1 from "../images/logo.png";

const Blog = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, [currentPage]);

  const navigate = useNavigate();
  const handlelogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/land");
  };

  const fetchBlogs = () => {
    if (searchQuery) {
      searchBlogsApi(searchQuery)
        .then((res) => {
          if (res.data) {
            setBlogs(res.data);
            setTotalPages(1);
          } else {
            setBlogs([]); // Set empty array if no data
            setTotalPages(1);
          }
        })
        .catch((error) => {
          console.error("Error in searchBlogsApi:", error);
        });
    } else {
      getUserBlogPaginationApi(currentPage)
        .then((res) => {
          if (res.data && res.data.blogs) {
            setBlogs(res.data.blogs);
            setTotalPages(res.data.totalPages);
          } else {
            setBlogs([]); // Set empty array if no data
            setTotalPages(1);
          }
        })
        .catch((error) => {
          console.error("Error in getUserProductPaginationApi:", error);
        });
    }
  };
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber.selected + 1);
  };
  const handleSearch = () => {
    setCurrentPage(1); // Reset current page when searching
    fetchBlogs();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={img1} alt="" style={{ height: "50px", width: "210px" }} />
          </a>
          <ul
            className="navbar-nav"
            style={{ marginLeft: "14rem" }}
            role="search"
          >
            <li className="nav-item">
              <form className="d-flex mx-auto">
                <input
                  className="form-control custom-search-lg  border-dark"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  style={{
                    width: "400px",
                    height: "calc(1.5em + 0.75rem + 2px)",
                    borderRadius: "0.25rem",
                  }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-success ms-2"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </form>
            </li>
          </ul>
          <form className="navbar-nav ms-auto">
            <li className="nav-item">
              {user ? (
                <>
                  <div
                    className="d-flex align-items-center "
                    style={{ marginLeft: "7rem" }}
                  >
                    <img
                      src={`${user.userImageUrl}`}
                      alt=""
                      className="rounded-circle me-2"
                      style={{ width: "40px", height: "40px" }}
                    />

                    <div className="dropdown">
                      <button
                        className="btn btn-outline-light border-0  dropdown-toggle fs-5 text-success "
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Welcome{" "}
                        <span className="text-dark">{user.firstName}</span>!
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <Link
                            className="dropdown-item"
                            to={`/profile/edit/${user._id}`}
                          >
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to={`/changePassword/${user._id}`}
                          >
                            Reset Password
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={handlelogout}
                            className="dropdown-item"
                            to="/logout"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    className="btn btn-outline-dark rounded-pill me-2 "
                    style={{ marginLeft: "9rem" }}
                    to={"/login"}
                  >
                    Login
                  </Link>
                  <Link
                    className="btn btn-outline-dark rounded-pill  me-3"
                    to={"/signup"}
                  >
                    Register
                  </Link>
                </>
              )}
            </li>
          </form>
          {/* Wishlist and Cart Icons */}
          <ul className="navbar-nav ms-auto">
            {/* ... */}
            <li className="nav-item">
              <a className="nav-link icon-red" href="#">
                <FaHeart className="text-red fs-5" />
                <span className="visually-hidden">Cart</span>
                <Link
                  className="text-dark ms-1"
                  to="/wishlist"
                  style={{ textDecoration: "none" }}
                >
                  Wishlist
                </Link>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link icon-green" href="#">
                <FaShoppingCart className="text-green fs-5" />
                <span className="visually-hidden">Cart</span>
                <Link
                  className="text-dark ms-1"
                  to="/addtocart"
                  style={{ textDecoration: "none" }}
                >
                  Cart
                </Link>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div>
        <Navbar />
      </div>
      <div className="container mt-5">
        <div className="row mt-4">
          {blogs.map((blog) => (
            <div key={blog.blogId} className="col-md-3 mb-4">
              <div className="card">
                <img
                  src={blog.blogImageUrl}
                  style={{ height: "200px", width: "100%", objectFit: "cover" }}
                  className="card-img-top img-fluid"
                  alt={`Blog ${blog.blogId}`}
                />
                <div className="card-body">
                  <h5 className="card-title">{blog.blogTitle}</h5>
                  <p className="card-text">Author: {blog.blogAuthor}</p>
                  <p className="card-text">
                    Date: {new Date(blog.blogDate).toLocaleDateString()}
                  </p>
                  <p className="card-text">Category: {blog.blogCategory}</p>
                  <p className="card-text">Content: {blog.blogContent}</p>
                  <a
                    style={{
                      backgroundColor: "#28a745",
                      color: "#fff",
                      padding: "10px 20px",
                      borderRadius: "4px",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "1em",
                      fontWeight: "bold",
                      transition: "background-color 0.3s",
                    }}
                    href="#"
                    className="btn btn-primary"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={paginate}
        containerClassName="pagination justify-content-center"
        activeClassName="page-item active"
        pageLinkClassName="page-link text-success bg-light"
        previousClassName={`page-item ${currentPage === 1 ? "disabled" : ""}`}
        nextClassName={`page-item ${
          currentPage === totalPages ? "disabled" : ""
        }`}
        previousLinkClassName="page-link text-success"
        nextLinkClassName="page-link text-success"
        breakClassName="page-item"
        breakLinkClassName="page-link text-success"
      />
    </>
  );
};

export default Blog;
