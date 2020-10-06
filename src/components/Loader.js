import React from "react";
import BarLoader from "react-spinners/BarLoader";

const Loader = () => {
  return (
    <>
      <div style={{ display: "grid", placeItems: "center", height: "300px" }}>
        <BarLoader />
      </div>
    </>
  );
};

export default Loader;
