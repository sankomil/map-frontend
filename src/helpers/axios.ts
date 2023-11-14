import axios, { AxiosError } from "axios";
import { IPostRoute, IGetRoute, IGetRouteResponse } from "../definitions";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_ENDPOINT,
});

export const postRoute = async ({ origin, destination }: IPostRoute) => {
  let res = {};
  let err: AxiosError | null = null;

  await axiosInstance
    .post("/route", {
      origin,
      destination,
    })
    .then((res) => {
      res = res.data;
    })
    .catch((e: AxiosError) => {
      console.error("error", e);
      err = e;
    });

  return { res, err };
};

export const getRoute = async ({ token }: IGetRoute) => {
  let res: IGetRouteResponse = { status: "failure" };
  let err: AxiosError | null = null;

  await axiosInstance
    .get(`/route/${token}`)
    .then((response) => {
      res = response.data;
    })
    .catch((e: AxiosError) => {
      console.error("error", e);
      err = e;
    });

  return { res, err };
};

export const pollGetRoute = async ({ token }: IGetRoute) => {
  const { res, err } = await getRoute({ token });

  if (err) {
    return err;
  }

  if (res.status === "success") {
    return res;
  } else {
    pollGetRoute({ token });
  }
};
