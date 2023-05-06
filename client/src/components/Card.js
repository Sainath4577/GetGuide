import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Card(props) {
  useEffect(() => {
    {
      console.log(props);
    }
  }, []);
  return (
    <div
      className="card p-3  d-flex align-items-center justify-content-start col-md-3 col-11 m-1 flex-column"
      style={{ minHeight: "300px" }}
    >
      <div>
        <Link to={`/loc/${props.loc.lat}/${props.loc.lng}`}>
          <h2 className="card-title my-3" style={{ textAlign: "left" }}>
            {props.name}
          </h2>
        </Link>
      </div>
      <div>
        {" "}
        <p>{props.address}</p>
      </div>
    </div>
  );
}

export default Card;
