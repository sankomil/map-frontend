import { useContext } from "react";

import { DefaultGlobalContext } from "../context/GlobalContext";
import { getRoute, postRoute } from "../helpers";
import {
  IPostRoute,
  IGetRoute,
  IUseGlobalContext,
  IUseGetRoute,
} from "../definitions";

export const useGlobalContext = (): IUseGlobalContext => {
  const { error, paths, token } = useContext(DefaultGlobalContext);
  return { paths, error, token };
};

export const useGetRoute = (): IUseGetRoute => {
  const { setPaths, setError, paths, error } = useContext(DefaultGlobalContext);

  const getPathRoute = async ({ token }: IGetRoute) => {
    const { res, err } = await getRoute({ token: token || "" });

    if (err) {
      setError(err?.message);
      setPaths([]);
      setTimeout(() => {
        setError("");
      }, 5000);
      return;
    }

    if (res.status === "success") {
      setPaths(res.path);
    } else if (res.status === "failure") {
      setError(res?.error);
      setPaths([]);
      setTimeout(() => {
        setError("");
      }, 5000);
    } else {
      getPathRoute({ token });
    }
  };

  const getPathToken = async ({ origin, destination }: IPostRoute) => {
    const { res, err } = await postRoute({ origin, destination });
    if (err) {
      setError(err?.message);
      setPaths([]);
      setTimeout(() => {
        setError("");
      }, 5000);
      return;
    }

    getPathRoute({ token: res.token });
  };

  return { getPathRoute, getPathToken, paths, error };
};
