import React from "react";
import { useGlobalContext } from "../../hooks";
import { IAlert } from "./Alert.d";
import "./index.css";

export const Alert: React.FC<IAlert> = ({ type = "danger" }) => {
  const { error } = useGlobalContext();
  return (
    <div className="alert-element">
      {error && (
        <div className={`alert alert-${type}`} data-testid="alert-element">
          {error}
        </div>
      )}
    </div>
  );
};
