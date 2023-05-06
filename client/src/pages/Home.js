import React, { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import { BiCurrentLocation } from "react-icons/bi";
import { FaSearchLocation } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../components/Loader";
import Card from "../components/Card";
function Home() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isloading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [isplaces, setPlaces] = useState([]);
  const [currentCity, setCurrentcity] = useState(null);

  // const handleOnChange = (e) => {
  //   const { name, value } = e.target;
  //   setformData((prev) => {
  //     return {
  //       ...prev,
  //       [name]: value,
  //     };
  //   });
  // };

  const getCords = async () => {
    try {
      const position = await getCurrentLocation();
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getCords();
  }, []);
  const getTouristPlaces = async () => {
    try {
      // const response = await axios.get(
      // "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=13.3182853,77.1359441&radius=100000&types=tourist_attraction&key=AIzaSyCtA_cSETT5UZ6NowGM3wHVowyEbB4_lhg"
      //   // "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=13.3182853,77.1359441&radius=100000&type=attractions&key=AIzaSyCtA_cSETT5UZ6NowGM3wHVowyEbB4_lhg"
      //   // "https://nearby-places.p.rapidapi.com/v2/nearby",
      //   // {
      //   //   params: {
      //   //     lat: latitude,
      //   //     lng: longitude,
      //   //     type: "tourist attraction",
      //   //     radius: "10000",
      //   //   },
      //   // },
      //   // {
      //   //   headers: {
      //   //     "X-RapidAPI-Key":
      //   //       "80e62722c7mshe1434d65dc48725p1c5d53jsn40e0dc3ae187",
      //   //     "X-RapidAPI-Host": "nearby-places.p.rapidapi.com",
      //   //   },
      //   // }

      //   "https://nearby-places.p.rapidapi.com/v2/nearby?lat=49.2803703&lng=-123.0413988&type=tourist%20attraction&radius=500'header 'X-RapidAPI-Host: nearby-places.p.rapidapi.com' --header 'X-RapidAPI-Key: 80e62722c7mshe1434d65dc48725p1c5d53jsn40e0dc3ae187"
      // );
      const response = await axios.get(
        "https://nearby-places.p.rapidapi.com/v2/nearby",

        {
          params: {
            lat: latitude,
            lng: longitude,
            type: "tourist attraction",
            radius: "10000",
          },
          headers: {
            "X-RapidAPI-Key":
              "9b3739f5b2msh44d5ca7e998f6d3p142b36jsn44eee64a31ee",
            "X-RapidAPI-Host": "nearby-places.p.rapidapi.com",
          },
        }
      );

      setPlaces(response.data.results);
      const places = response.data.results.map((place) => ({
        name: place.name,
        address: place.vicinity,
        location: place.geometry.location,
      }));
      setPlaces(places);
    } catch (error) {
      console.log(error.message);
    }
  };
  function getCurrentLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }
  const handleButtonClick = async () => {
    setLoading(true);
    try {
      await getCurrentCity();
      // console.log(isplaces);
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
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
      await getTouristPlaces();
    } catch (error) {
      console.log(error.message);
    }
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
        <div className="col-md-10 my-5  col-12 d-flex flex-column align-items-center justify-content-center">
          <div className="w-100 my-4 d-flex flex-column align-items-center justify-content-center">
            <h1 className="my-4 align-self-start">Yo, where you at</h1>

            <button
              type="button"
              className="btn"
              onClick={(e) => handleButtonClick(e)}
              style={{
                outline: "none",
                backgroundColor: "#fff",
                padding: "1rem 1.5rem",
                borderRadius: "20px",
                border: "1px solid #b9d7ea",
              }}
            >
              {!isloading ? (
                "Get Current Location"
              ) : (
                <Loader color={"#769fcd"} />
              )}

              <BiCurrentLocation className="icon" />
            </button>
          </div>
          {currentCity && (
            <div className="w-100 my-4">
              <h2 className="my-4">Things to do in</h2>
              <h1 className="my-4 text-capitalize">{currentCity}</h1>
            </div>
          )}
          {currentCity && (
            <div className="w-100 my-4">
              <h2 className="my-4">Available activities</h2>
            </div>
          )}

          {currentCity && (
            <div className="w-100 my-4">
              <h2 className="my-4">Places in </h2>
              <h1 className="my-4 text-capitalize">{currentCity}</h1>
              <div
                className="row align-items-center justify-content-center flex-wrap"
                style={{ gap: "1.5rem" }}
              >
                {isplaces.map((item, index) => (
                  <Card
                    key={index}
                    name={item.name}
                    address={item.address}
                    loc={item.location}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
