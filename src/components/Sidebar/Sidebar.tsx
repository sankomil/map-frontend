import React from "react";
import "./index.css";

export const Sidebar: React.FC = () => {
  return (
    <div className="sidebar-container p-3">
      <h1 className="display-5 text-center">Location points</h1>
      <div className="d-flex flex-column mt-5">
        <label htmlFor="start-point" className="mb-1">
          Start point
        </label>
        <div className="d-flex align-items-center">
          <input id="start-point" className="w-100" />
          <button
            type="button"
            className="close btn btn btn-outline-secondary ms-3 btn-sm"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
      <div className="d-flex flex-column mt-5">
        <label htmlFor="end-point" className="mb-1">
          End point
        </label>
        <div className="d-flex align-items-center">
          <input id="end-point" className="w-100" />
          <button
            type="button"
            className="close btn btn btn-outline-secondary ms-3 btn-sm"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
      <div className="d-flex flex-row mt-4">
        <button className="btn btn-success me-3">Submit</button>
        <button className="btn btn-danger">Cancel</button>
      </div>
    </div>
  );
};
