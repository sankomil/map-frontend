import axios, { AxiosError } from "axios";
import {
  IPostRoute,
  IGetRoute,
  IGetRouteResponse,
  IPostRouteResponse,
} from "../definitions";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_ENDPOINT,
});

export const postRoute = async ({ origin, destination }: IPostRoute) => {
  let res: IPostRouteResponse = { token: "" };
  let err: AxiosError | any = null;

  await axiosInstance
    .post("/route", {
      origin,
      destination,
    })
    .then((response) => {
      res = response.data;
    })
    .catch((e: AxiosError) => {
      console.error("error", e);
      err = e;
    });

  return { res, err };
};

export const getRoute = async ({ token }: IGetRoute) => {
  let res: IGetRouteResponse = { status: "failure" };
  let err: AxiosError | any = null;

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
