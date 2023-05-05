import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

function Login() {
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setLoading] = useState(false);
  const { user, dispatch } = useContext(AuthContext);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setformData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    const user = {
      email: formData.email.toString().toLowerCase(),
      password: formData.password.toString(),
    };
    axios
      .post("/api/user/login", user)
      .then((response) => {
        if (response.status === 200) {
          toast.success("LoggedIn successfully !!!");
          localStorage.setItem(
            "cUser",
            JSON.stringify(response.data.userToken)
          );
          dispatch({ type: "LOGIN_SUCCESS", payload: response.data.token });
          setLoading(false);
          navigate("/");
          setformData({
            email: "",
            password: "",
          });
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        dispatch({ type: "LOGIN_FAILURE", payload: error });
      });
  };
  return (
    <div className="container-fluid">
      <div
        className="row align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="card col-md-4 col-11 my-2 p-3 d-flex flex-column align-items-center justify-content-center">
          <form onSubmit={handleSubmit} className="m-2 p-1 w-100">
            <h2 className="text-left m-1 mb-4">Sign in</h2>

            <input
              type="email"
              className="form-control my-3 py-3"
              placeholder="Enter your email"
              name="email"
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              id="email"
              value={formData.email}
              onChange={handleOnChange}
              style={{
                borderRadius: "10px",
                outline: "none",
                backgroundColor: "#f7f7f7",
                border: "none",
              }}
            />

            <input
              type="password"
              className="form-control my-3 py-3"
              placeholder="Enter your password"
              name="password"
              required
              minLength={6}
              id="password"
              style={{
                borderRadius: "10px",
                outline: "none",
                backgroundColor: "#f7f7f7",
                border: "none",
              }}
              value={formData.password}
              onChange={handleOnChange}
            />

            <button
              type="submit"
              className="btn btn-dark w-100 my-2"
              style={{ backgroundColor: "#393e46", borderRadius: "10px" }}
            >
              {isLoading ? <Loader color="#f7f7f7" /> : "Login"}
            </button>
          </form>
          <Link to={"/register"}>
            {" "}
            <small>Don't have an account? Sign up</small>{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
