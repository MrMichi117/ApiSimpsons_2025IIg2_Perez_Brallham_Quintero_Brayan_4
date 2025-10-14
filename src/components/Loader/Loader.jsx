import React from "react";
import "./Loader.css";
import homerGif from "./homer-donut-loader.gif";

const Loader = () => (
    <div className="loader-container">
        <img
            src={homerGif}
            alt="Homero comiendo una dona"
            className="loader-image"
        />
        <p>No di nada y gozalo...</p>
    </div>
);

export default Loader;
