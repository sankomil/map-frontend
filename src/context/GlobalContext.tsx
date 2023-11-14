import React, { useState } from "react";
import { IGlobalContext } from "./GlobalContext.d";
import { ReactChildren } from "../definitions";

export const DefaultGlobalContext = React.createContext<IGlobalContext>({
  error: null,
  setError: () => {},
  paths: [],
  setPaths: () => {},
  token: null,
  setToken: () => {},
});

export const GlobalContext = ({ children }: ReactChildren) => {
  const [error, setError] = useState<string | null>(null);
  const [paths, setPaths] = useState<string[][]>([]);
  const [token, setToken] = useState<string | null>(null);

  const value = { error, setError, paths, setPaths, token, setToken };

  return (
    <DefaultGlobalContext.Provider value={value}>
      {children}
    </DefaultGlobalContext.Provider>
  );
};
