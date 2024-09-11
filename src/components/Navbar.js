import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./ContextReducer";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import "./Card.css"; // Import the CSS file
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    ochre: {
      main: '#E3D026',
      light: '#E9DB5D',
      dark: '#A29415',
      contrastText: '#242105',
    },
  },
});

const Navbar = React.memo(() => {
  const navigate = useNavigate();
  const [cartView, setCartView] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Added state for search input
  let data = useCart();

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const handleMyCart = () => {
    setCartView(true);
  };

  const [isActive, setIsActive] = useState(false);

  const handleMouseEnter = () => {
    setIsActive(true);
  };

  const handleMouseLeave = () => {
    if (!document.querySelector(".search-wrapper input").value.trim()) {
      setIsActive(false);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
        <Link className="navbar-brand" to="/">
            Foodiee
          </Link>
        <div className="search-sec">
        <div
              className={`search-wrapper ${isActive ? "active" : ""}`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <input
                type="search"
                placeholder="Search"
                onFocus={() => setIsActive(true)}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => {
                  if (
                    !document
                      .querySelector(".search-wrapper input")
                      .value.trim()
                  ) {
                    setIsActive(false);
                  }
                }}
              />
              <button className="search-btn">
                <SearchTwoToneIcon />
              </button>
            </div>
        </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/myorder"
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            <div className="nav-right">
              <div className="search-prim">
              <div
              className={`search-wrapper ${isActive ? "active" : ""}`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <input
                type="search"
                placeholder="Search"
                onFocus={() => setIsActive(true)}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => {
                  if (
                    !document
                      .querySelector(".search-wrapper input")
                      .value.trim()
                  ) {
                    setIsActive(false);
                  }
                }}
              />
              <button className="search-btn">
                <SearchTwoToneIcon />
              </button>
            </div>
              </div>
            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link className="btn bg-white text-success mx-1" to="/login">
                  Login
                </Link>
                <Link className="btn bg-white text-success mx-1" to="/signup">
                  SignUp
                </Link>
              </div>
            ) : (
              <div className="nav-li">
                <Box sx={{ "& button": { m: 1 } }}>
                  <Button variant="outlined" color="secondary" size="small"
                  startIcon={<ShoppingCartTwoToneIcon/>}
                  onClick={handleMyCart}
                  title="My Cart"
                  >
                    Cart
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info">
                    {data.length}
                  </span>
                  </Button>
                  <Button variant="outlined" color="secondary" size="small"
                  startIcon={<LogoutTwoToneIcon/>}
                  onClick={handleLogOut}
                  >Logout</Button>
                </Box>
                {cartView ? (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart />
                  </Modal>
                ) : null}
              </div>
            )}
          </div>
        </div>
        </div>
      </nav>
    </>
  );
});

export default Navbar;
