import React, { useState } from "react";
import { IGlobalContext } from "./GlobalContext.d";
import { ReactChildren } from "../definitions";

export const DefaultGlobalContext = React.createContext<IGlobalContext>({
  error: null,
  setError: () => {},
  paths: [],
  setPaths: () => {},
  totalDistance: null,
  setTotalDistance: () => {},
  totalTime: null,
  setTotalTime: () => {},
  loading: false,
  setLoading: () => {},
});

export const GlobalContext = ({ children }: ReactChildren) => {
  const [error, setError] = useState<string | null>(null);
  const [paths, setPaths] = useState<string[][]>([]);
  const [totalDistance, setTotalDistance] = useState<number | null>(null);
  const [totalTime, setTotalTime] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const value = {
    error,
    setError,
    paths,
    setPaths,
    totalDistance,
    totalTime,
    setTotalDistance,
    setTotalTime,
    loading,
    setLoading,
  };

  return (
    <DefaultGlobalContext.Provider value={value}>
      {children}
    </DefaultGlobalContext.Provider>
  );
};
