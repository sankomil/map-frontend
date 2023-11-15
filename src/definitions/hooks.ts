import { IGetRoute, IPostRoute } from "./axios";

export interface IUseGlobalContext {
  error: string | null;
  paths: string[][] | null;
  token: string | null;
}

export interface IUseGetRoute {
  getPathRoute: ({ token }: IGetRoute) => void;
  getPathToken: ({ origin, destination }: IPostRoute) => void;
  error: string | null;
  paths: string[][] | null;
}
