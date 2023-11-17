import { AxiosError } from "axios";

export interface IPostRoute {
  origin: string;
  destination: string;
}

export interface IGetRoute {
  token: string;
}

export interface IGetRouteResponse {
  status: "in progress" | "success" | "failure";
  error?: string;
  total_distance?: number;
  total_time?: number;
  path?: string[][];
}

export interface IPostRouteResponse {
  token: string;
}

export interface IGetRouteReturn {
  res: IGetRouteResponse;
  err: AxiosError | null;
}

export interface IPostRouteReturn {
  res: IPostRouteResponse;
  err: AxiosError | null;
}
