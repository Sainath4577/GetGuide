import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function LocationData() {
  const { lcn } = useParams();
  const [areaData, setAreaData] = useState();
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/staticmap?center=${lcn}&size=600x300&key=AIzaSyCtA_cSETT5UZ6NowGM3wHVowyEbB4_lhg`
      );
      const imageUrl = response.data;
      setAreaData(imageUrl);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container-fluid">
      <img src={areaData} alt="hh" />
    </div>
  );
}

export default LocationData;
