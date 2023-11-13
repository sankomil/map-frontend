import React from "react";
import { Map as GoogleMap, Marker } from "@vis.gl/react-google-maps";

export const Map: React.FC = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        position: "relative",
        border: "1px solid black",
      }}
    >
      <GoogleMap
        zoom={6}
        center={{ lat: 53.54992, lng: 10.00678 }}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      >
        <Marker position={{ lat: 53.54992, lng: 10.00678 }} />
      </GoogleMap>
    </div>
  );
};
