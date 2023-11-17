import axios, { AxiosError } from "axios";
import {
  IPostRoute,
  IGetRoute,
  IGetRouteResponse,
  IPostRouteResponse,
  IGetRouteReturn,
  IPostRouteReturn,
} from "../definitions";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_ENDPOINT,
});

export const postRoute = async ({
  origin,
  destination,
}: IPostRoute): Promise<IPostRouteReturn> => {
  let res: IPostRouteResponse = { token: "" };
  let err: AxiosError | null = null;

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

export const getRoute = async ({
  token,
}: IGetRoute): Promise<IGetRouteReturn> => {
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
