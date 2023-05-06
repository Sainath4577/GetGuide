import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { HiOutlineMenuAlt4, HiOutlineChevronRight } from "react-icons/hi";
import { AuthContext } from "../context/AuthContext";
function NavBar(props) {
  const { user, dispatch } = useContext(AuthContext);
  const [isNav, setNav] = useState(false);
  return (
    <>
      {!isNav ? (
        <div
          className="position-fixed d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: "#f7fbfc",
            aspectRatio: "1",
            width: "2.5rem",
            borderRadius: "50%",
            top: "15px",
            right: "10px",
            zIndex: "1000",
            cursor: "pointer",
            boxShadow:
              "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
          }}
        >
          <HiOutlineMenuAlt4
            onClick={() => {
              setNav(!isNav);
            }}
            className="rotate-in-center"
            style={{
              color: "#769fcd",
              fontSize: "2rem",
            }}
          />
        </div>
      ) : (
        <div
          className="position-fixed d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: "#f7fbfc",
            aspectRatio: "1",
            width: "2.5rem",
            borderRadius: "50%",
            top: "15px",
            right: "10px",
            zIndex: "1000",
            cursor: "pointer",
            boxShadow:
              "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
          }}
        >
          <HiOutlineChevronRight
            onClick={() => {
              setNav(!isNav);
            }}
            className="rotate-in-center "
            style={{
              color: "#769fcd",
              fontSize: "2rem",
            }}
          />
        </div>
      )}

      <nav
        className="position-fixed top-0 p-3"
        style={{
          width: "100%",
          minHeight: "100vh",
          zIndex: "999",
          right: isNav ? "0" : "-200%",
          transition: ".5s ease-in-out",
        }}
      >
        <div className="container-fluid">
          <div
            className="d-flex align-items-start justify-content-star "
            style={{ minHeight: "100vh" }}
          >
            <ul className="p-2 mx-1 position-absolute">
              <li>
                <Link to={"/"}>
                  <h1 style={{ color: props.p === 1 ? "#b9d7ea" : "#769fcd" }}>
                    Home
                  </h1>
                </Link>
              </li>

              <li>
                <Link to={"/about"}>
                  <h1 style={{ color: props.p === 4 ? "#b9d7ea" : "#769fcd" }}>
                    About
                  </h1>
                </Link>
              </li>
              <li>
                <Link to={"/contact"}>
                  <h1 style={{ color: props.p === 5 ? "#b9d7ea" : "#769fcd" }}>
                    Contact
                  </h1>
                </Link>
              </li>
              {!user ? (
                <li>
                  <Link to={"/login"}>
                    <h1
                      style={{ color: props.p === 4 ? "#b9d7ea" : "#769fcd" }}
                    >
                      Sign in
                    </h1>
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    onClick={() => {
                      localStorage.clear();
                      dispatch({ type: "LOGOUT_SUCCESS", payload: null });
                    }}
                  >
                    Sign out
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
