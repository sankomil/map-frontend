import React from "react";
import { Icon } from "@iconify/react";
import { IMapPin } from "./MapPin.d";

export const MapPin: React.FC<IMapPin> = ({ label, pinType }) => {
  const pinColor =
    pinType === "origin"
      ? "#8fbc8f"
      : pinType === "destination"
      ? "#ff6347"
      : "#07f";
  return (
    <div className="d-flex flex-row align-items-center">
      <Icon icon="mdi:location" color={pinColor} />
      <h6 className="text-success">{label}</h6>
    </div>
  );
};
