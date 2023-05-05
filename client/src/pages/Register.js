import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";
function Register() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
  });
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
    e.preventDefault();
    setLoading(true);
    if (formData.password1 !== formData.password2) {
      toast.error("Passwords don't match !!!");
      setLoading(false);
    } else {
      const user = {
        name: formData.name.toString().toLowerCase(),
        email: formData.email.toString().toLowerCase(),
        password: formData.password2.toString(),
      };
      axios
        .post("/api/user/register", user)
        .then((response) => {
          if (response.status === 200) {
            toast.success("Registered successfully !!!");
            localStorage.setItem(
              "cUser",
              JSON.stringify(response.data.userToken)
            );
            dispatch({ type: "LOGIN_SUCCESS", payload: response.data.token });
            setLoading(false);
            navigate("/");
            setformData({
              name: "",
              email: "",
              password1: "",
              password2: "",
            });
          }
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  };

  return (
    <div className="container-fluid ">
      <div
        className="row align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="card col-md-4 col-11 my-2 p-3 d-flex flex-column align-items-center justify-content-center">
          <form onSubmit={handleSubmit} className="m-2 p-1 w-100">
            <h2 className="text-left m-1 mb-4">Sign up</h2>

            <input
              type="text"
              className="form-control  my-3 py-3"
              placeholder="Enter your name"
              name="name"
              required
              id="name"
              value={formData.name}
              onChange={handleOnChange}
              style={{
                borderRadius: "10px",
                outline: "none",
                backgroundColor: "#f7f7f7",
                border: "none",
              }}
            />

            <input
              type="email"
              className="form-control  my-3 py-3"
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
              className="form-control  my-3 py-3"
              placeholder="Create your password"
              name="password1"
              required
              minLength={6}
              id="password1"
              value={formData.password1}
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
              className="form-control  my-3 py-3"
              placeholder="Confirm your password"
              name="password2"
              required
              minLength={6}
              id="password2"
              value={formData.password2}
              onChange={handleOnChange}
              style={{
                borderRadius: "10px",
                outline: "none",
                backgroundColor: "#f7f7f7",
                border: "none",
              }}
            />

            <button
              type="submit"
              className="btn btn-dark w-100 my-2"
              style={{ backgroundColor: "#393e46", borderRadius: "10px" }}
            >
              {isLoading ? <Loader color="#f7f7f7" /> : "Register"}
            </button>
          </form>
          <Link to={"/login"}>
            {" "}
            <small>Already have an account? Sign in</small>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
