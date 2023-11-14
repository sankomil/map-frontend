export interface IGlobalContext {
  paths: string[][];
  setPaths: Function;
  error: string | null;
  setError: Function;
  token: string | null;
  setToken: Function;
}
