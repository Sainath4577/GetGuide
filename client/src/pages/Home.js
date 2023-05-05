import React, { useState } from "react";
import NavBar from "../components/Navbar";
import { BiCurrentLocation } from "react-icons/bi";
import { FaSearchLocation } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
function Home() {
  const [formData, setformData] = useState({
    location: "",
  });
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isloading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentcity] = useState(null);
  const [destiny, setDestiny] = useState();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setformData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  function getCurrentLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  const getLocation = () => {
    getCurrentLocation()
      .then((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        getCurrentCity();
      })
      .catch((error) => toast.error(error.message));
  };
  const getCurrentCity = async () => {
    try {
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCtA_cSETT5UZ6NowGM3wHVowyEbB4_lhg`
      );
      const cityComponent = res.data.results[0].address_components.find(
        (component) => component.types.includes("locality")
      );
      setCurrentcity(cityComponent.long_name);
      console.log(currentCity);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="container-fluid " style={{ minHeight: "100vh" }}>
      <NavBar p={1} />
      <div className="hero p-2 row align-items-center justify-content-center flex-column">
        <div
          className="col-12 p-2 d-flex flex-row align-items-center justify-content-start"
          style={{ minHeight: "100vh" }}
        >
          <h1 className="focus-in-contract-bck">
            Get
            <br />
            Guide
          </h1>
        </div>
      </div>
      <div className="my-5 p-2 row align-items-center justify-content-center flex-column">
        <div className="col-md-8 my-5  col-12 d-flex flex-column align-items-center justify-content-center">
          <div className="w-100 my-4">
            <h1 className="my-4">Yo, where you at</h1>
            <form className="col-12" onSubmit={handleSubmit}>
              <div className="input-group d-flex align-items-center justify-content-center">
                <div className="input-group-prepend my-4">
                  <button
                    type="button"
                    className="btn btn-getLoc"
                    onClick={() => getLocation()}
                    style={{
                      outline: "none",
                      backgroundColor: "#fff",
                      padding: "1rem",
                      borderRadius: "30px 0 0 30px",
                      border: "1px solid #b9d7ea",
                    }}
                  >
                    <BiCurrentLocation className="icon" />
                  </button>
                </div>

                <input
                  type="text"
                  className="form-control "
                  placeholder="Enter your location (e.g. Tumkur)"
                  onChange={handleOnChange}
                  name="location"
                  id="auto-address"
                  style={{
                    outline: "none",
                    backgroundColor: "#fff",
                    padding: "1rem",
                    border: "1px solid #b9d7ea",
                  }}
                />

                <div className="input-group-append">
                  <button
                    className="btn"
                    type="submit"
                    style={{
                      outline: "none",
                      backgroundColor: "#b9d7ea",
                      padding: "1rem",
                      borderRadius: "0 30px 30px 0",
                    }}
                  >
                    Search
                    {/* <FaSearchLocation className="icon mx-1" /> */}
                  </button>
                </div>
              </div>
            </form>
          </div>
          {currentCity && (
            <div className="w-100 my-4">
              <h2 className="my-4">
                Things to do in
                <h1 className="my-4 text-capitalize">{currentCity}</h1>
              </h2>
            </div>
          )}
          {currentCity && (
            <div className="w-100 my-4">
              <h2 className="my-4">Available activities</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
