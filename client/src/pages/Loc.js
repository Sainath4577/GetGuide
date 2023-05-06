import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function LocationData() {
  const { lt, ln } = useParams();
  const [areaData, setAreaData] = useState();
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lt},${ln}&key=AIzaSyCtA_cSETT5UZ6NowGM3wHVowyEbB4_lhg`
      );

      const cityComponent = response.data.results[0].address_components.find(
        (component) => component.types.includes("locality")
      );

      setAreaData(cityComponent);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container-fluid">
      {areaData && (
        <div>
          <h1 className="my-5" style={{ textAlign: "center" }}>
            {areaData.long_name}
          </h1>
          {areaData.types.map((i) => (
            <p className="my-5" style={{ textAlign: "center" }}>
              {i}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default LocationData;
