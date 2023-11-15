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
  const { error, paths } = useContext(DefaultGlobalContext);
  return { paths, error };
};

export const useGetRoute = (): IUseGetRoute => {
  const {
    setPaths,
    setError,
    paths,
    error,
    setTotalDistance,
    setTotalTime,
    totalDistance,
    totalTime,
    loading,
    setLoading,
  } = useContext(DefaultGlobalContext);

  const getPathRoute = async ({ token }: IGetRoute) => {
    const { res, err } = await getRoute({ token: token || "" });

    if (err) {
      setError(err?.message);
      setPaths([]);
      setLoading(false);
      setTotalDistance(null);
      setTotalTime(null);
      setTimeout(() => {
        setError("");
      }, 5000);
      return;
    }

    if (res.status === "success") {
      setPaths(res.path);
      setTotalDistance(res.total_distance);
      setTotalTime(res.total_time);
      setLoading(false);
    } else if (res.status === "failure") {
      setError(res?.error);
      setPaths([]);
      setLoading(false);
      setTotalDistance(null);
      setTotalTime(null);
      setTimeout(() => {
        setError("");
      }, 5000);
    } else {
      getPathRoute({ token });
    }
  };

  const getPathToken = async ({ origin, destination }: IPostRoute) => {
    setLoading(true);
    const { res, err } = await postRoute({ origin, destination });
    if (err) {
      setError(err?.message);
      setPaths([]);
      setTotalDistance(null);
      setTotalTime(null);
      setTimeout(() => {
        setError("");
      }, 5000);
      return;
    }

    getPathRoute({ token: res.token });
  };

  return {
    getPathRoute,
    getPathToken,
    paths,
    error,
    totalDistance,
    totalTime,
    loading,
  };
};
