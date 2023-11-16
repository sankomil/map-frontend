import React from "react";
import { Map as GoogleMap } from "@vis.gl/react-google-maps";
import { Route } from "./Route";
import { useGlobalContext } from "../../hooks";
import "./index.css";

export const Map: React.FC = () => {
  const { paths } = useGlobalContext();
  return (
    <div className="map-container">
      <GoogleMap
        mapId="route-map"
        zoom={12.5}
        center={{
          lat: paths?.length ? parseFloat(paths[0][0]) : 22.396428,
          lng: paths?.length ? parseFloat(paths[0][1]) : 114.109497,
        }}
        gestureHandling={"greedy"}
        disableDefaultUI={false}
      ></GoogleMap>
      <Route paths={paths} />
    </div>
  );
};
