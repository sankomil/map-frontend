import React from "react";
import GoogleMapReact from "google-map-react";
import { MapPin } from "../MapPin";

export const Map: React.FC = () => {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "50vw",
        left: "20vw",
        top: 0,
        border: "1px solid black",
      }}
    >
      <GoogleMapReact
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_ID || "" }}
      >
        <MapPin label="Test" lat={10.99835602} lng={77.01502627} />
      </GoogleMapReact>
    </div>
  );
};
