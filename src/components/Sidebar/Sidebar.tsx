import React, { FormEvent, useState } from "react";
import "./index.css";
import { useGetRoute } from "../../hooks";

export const Sidebar: React.FC = () => {
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const { getPathToken } = useGetRoute();

  const onSubmit = async (e?: FormEvent<HTMLFormElement>): Promise<void> => {
    if (e) {
      e?.preventDefault();
    }
    await getPathToken({ origin, destination });
  };

  const onCancel = (): void => {
    setOrigin("");
    setDestination("");
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="sidebar-container p-3">
        <h1 className="display-5 text-center">Location points</h1>
        <div className="d-flex flex-column mt-5">
          <label htmlFor="start-point" className="mb-1">
            Start point
          </label>
          <div className="d-flex align-items-center">
            <input
              id="start-point"
              className="w-100"
              onChange={(e) => setOrigin(e.target.value)}
            />
            <button
              type="button"
              className="close btn btn btn-outline-secondary ms-3 btn-sm"
              aria-label="Close"
              onClick={() => setOrigin("")}
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
            <input
              id="end-point"
              className="w-100"
              onChange={(e) => setDestination(e.target.value)}
            />
            <button
              type="button"
              className="close btn btn btn-outline-secondary ms-3 btn-sm"
              aria-label="Close"
              onClick={() => setDestination("")}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
        <div className="d-flex flex-row mt-4">
          <button
            className="btn btn-success me-3"
            type="button"
            onClick={() => onSubmit()}
          >
            Submit
          </button>
          <button className="btn btn-danger" onClick={() => onCancel()}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};
