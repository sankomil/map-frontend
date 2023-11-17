import React, { FormEvent, useRef, useState } from "react";
import { useAutocomplete } from "@vis.gl/react-google-maps";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import { useGetRoute } from "../../hooks";
import "./index.css";

export const Sidebar: React.FC = () => {
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  const { getPathToken, totalDistance, totalTime, loading, resetAll } =
    useGetRoute();

  const originRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);

  const onOriginPlaceChange = (place: google.maps.places.PlaceResult) => {
    if (place) {
      setOrigin(place.formatted_address || place.name || "");
    }

    originRef.current && originRef.current.focus();
  };

  const onDestinationPlaceChange = (place: google.maps.places.PlaceResult) => {
    if (place) {
      setDestination(place.formatted_address || place.name || "");
    }

    destinationRef.current && destinationRef.current.focus();
  };

  useAutocomplete({
    inputField: originRef && originRef.current,
    onPlaceChanged: onOriginPlaceChange,
  });

  useAutocomplete({
    inputField: destinationRef && destinationRef.current,
    onPlaceChanged: onDestinationPlaceChange,
  });

  const onSubmit = async (e?: FormEvent<HTMLFormElement>): Promise<void> => {
    if (e) {
      e.preventDefault();
    }
    await getPathToken({ origin, destination });
  };

  const onCancel = (): void => {
    setOrigin("");
    setDestination("");
    resetAll();
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="d-flex">
        <div
          data-testid="sidebar-container"
          className={clsx("sidebar-container p-4", {
            "sidebar-container-close": !showSidebar,
          })}
        >
          <h1 className="display-5 text-center">Route Finder!</h1>
          <h4 className="text-center">Now find routes easily.</h4>
          <div className="d-flex flex-column mt-4">
            <label htmlFor="start-point" className="mb-1">
              Origin:
            </label>
            <div className="d-flex align-items-center">
              <input
                id="start-point"
                data-testid="start-point-input"
                className="w-100"
                ref={originRef}
                disabled={loading}
                onChange={(e) => setOrigin(e.target.value)}
                value={origin}
              />
              <button
                type="button"
                className="close btn btn btn-outline-danger ms-3 btn-sm"
                data-testid="start-point-clear"
                aria-label="Close"
                disabled={loading}
                onClick={() => setOrigin("")}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
          <div className="d-flex flex-column mt-3">
            <label htmlFor="end-point" className="mb-1">
              Destination:
            </label>
            <div className="d-flex align-items-center">
              <input
                id="end-point"
                className="w-100"
                disabled={loading}
                ref={destinationRef}
                data-testid="end-point-input"
                onChange={(e) => setDestination(e.target.value)}
                value={destination}
              />
              <button
                type="button"
                className="close btn btn btn-outline-danger ms-3 btn-sm"
                aria-label="Close"
                disabled={loading}
                data-testid="end-point-clear"
                onClick={() => setDestination("")}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>

          {loading ? (
            <div
              className="spinner-border mt-4 text-primary"
              role="status"
            ></div>
          ) : (
            <div className="d-flex flex-row mt-4">
              <div className="me-3 d-flex flex-column align-items-center">
                <button
                  className="btn btn-outline-success"
                  data-testid="sidebar-submit"
                  disabled={!origin || !destination || loading}
                >
                  <Icon icon="ri:direction-fill" width="30" height="30" />
                </button>
                <p className="text-success">Search</p>
              </div>
              <div className="me-3 d-flex flex-column align-items-center">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  data-testid="sidebar-cancel"
                  disabled={loading}
                  onClick={() => onCancel()}
                >
                  <Icon icon="mdi:clear-bold" width="30" height="30" />
                </button>
                <p className="text-danger">Reset</p>
              </div>
            </div>
          )}
          {totalDistance && (
            <div className="d-flex align-items-end mt-4">
              <Icon
                icon="material-symbols:route"
                color="#ff671d"
                width="30"
                height="30"
              />
              <h5 className="m-0">Distance to destination:</h5>
              <h5 className="m-0 ms-2" data-testid="sidebar-distance">
                {totalDistance}
              </h5>
            </div>
          )}
          {totalTime && (
            <div className="d-flex align-items-end mt-4">
              <Icon
                icon="guidance:time"
                color="#ff671d"
                width="30"
                height="30"
              />
              <h5 className="m-0">Total travel time:</h5>
              <h5 className="m-0 ms-2" data-testid="sidebar-distance">
                {totalTime}
              </h5>
            </div>
          )}
        </div>
        <div
          data-testid="sidebar-toggle"
          className={clsx("toggle-container", {
            "toggle-container-close": !showSidebar,
          })}
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <Icon icon="pajamas:hamburger" />
        </div>
      </div>
    </form>
  );
};
