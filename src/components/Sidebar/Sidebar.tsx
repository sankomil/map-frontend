import React, { FormEvent, useState } from "react";
import { useGetRoute } from "../../hooks";
import "./index.css";

export const Sidebar: React.FC = () => {
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const { getPathToken, error } = useGetRoute();

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
              data-testid="start-point-input"
              className="w-100"
              onChange={(e) => setOrigin(e.target.value)}
              value={origin}
            />
            <button
              type="button"
              className="close btn btn btn-outline-secondary ms-3 btn-sm"
              data-testid="start-point-clear"
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
              data-testid="end-point-input"
              onChange={(e) => setDestination(e.target.value)}
              value={destination}
            />
            <button
              type="button"
              className="close btn btn btn-outline-secondary ms-3 btn-sm"
              aria-label="Close"
              data-testid="end-point-clear"
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
            data-testid="sidebar-submit"
            onClick={() => onSubmit()}
            disabled={!origin || !destination}
          >
            Submit
          </button>
          <button
            className="btn btn-danger"
            data-testid="sidebar-cancel"
            onClick={() => onCancel()}
          >
            Cancel
          </button>
        </div>
        {error ? (
          <p className="text-danger mt-4" data-testid="sidebar-error">
            {error}
          </p>
        ) : null}
      </div>
    </form>
  );
};
