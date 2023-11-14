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
