import React from "react";
import { Map as GoogleMap, Marker } from "@vis.gl/react-google-maps";
import { useGlobalContext } from "../../hooks";
import "./index.css";

export const Map: React.FC = () => {
  const { paths } = useGlobalContext();
  console.log("paths", paths);
  return (
    <div className="map-container">
      <GoogleMap
        zoom={12.5}
        center={{
          lat: paths.length ? parseFloat(paths[0][0]) : 22.396428,
          lng: paths.length ? parseFloat(paths[0][1]) : 114.109497,
        }}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      >
        {paths.map((path, index) => {
          return (
            <Marker
              key={`${path[0]}-${path[1]}-${index}`}
              position={{ lat: parseFloat(path[0]), lng: parseFloat(path[1]) }}
              label={`${index + 1}`}
            />
          );
        })}
      </GoogleMap>
    </div>
  );
};
