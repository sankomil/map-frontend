import React, { useEffect, useState } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";

export const Route: React.FC<{ paths: string[][] | null }> = ({ paths }) => {
  const map = useMap();
  const routes = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();

  useEffect(() => {
    if (!routes || !map) return;
    setDirectionsService(new routes.DirectionsService());
    setDirectionsRenderer(new routes.DirectionsRenderer({ map }));
  }, [routes, map]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer) {
      return;
    }

    if (!paths?.length || !paths) {
      directionsRenderer.set("directions", null);
      return;
    }

    directionsService
      .route({
        origin: { lat: parseFloat(paths[0][0]), lng: parseFloat(paths[0][1]) },
        destination: {
          lat: parseFloat(paths[2][0]),
          lng: parseFloat(paths[2][1]),
        },
        waypoints: [
          {
            location: {
              lat: parseFloat(paths[1][0]),
              lng: parseFloat(paths[1][1]),
            },
          },
        ],
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: false,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
      });
  }, [directionsService, directionsRenderer, paths]);

  return <div />;
};
