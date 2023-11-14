import { useContext } from "react";

import { DefaultGlobalContext } from "../context/GlobalContext";
import { getRoute, postRoute } from "../helpers";
import { IPostRoute, IGetRoute } from "../definitions";

export const useGlobalContext = () => {
  const { error, paths, token } = useContext(DefaultGlobalContext);
  return { paths, error, token };
};

export const useGetRoute = () => {
  const { setPaths, setError } = useContext(DefaultGlobalContext);

  const getPathRoute = async ({ token }: IGetRoute) => {
    const { res, err } = await getRoute({ token: token || "" });

    if (err) {
      setError(err?.message);
      return;
    }

    if (res.status === "success") {
      setPaths(res.path);
    } else {
      getPathRoute({ token });
    }
  };

  const getPathToken = async ({ origin, destination }: IPostRoute) => {
    const { res, err } = await postRoute({ origin, destination });
    if (err) {
      setError(err?.message);
      return;
    }

    getPathRoute({ token: res.token });
  };

  return { getPathRoute, getPathToken };
};
