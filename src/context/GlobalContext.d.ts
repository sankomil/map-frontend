export interface IGlobalContext {
  paths: string[][];
  setPaths: Function;
  error: string | null;
  setError: Function;
  totalDistance: number | null;
  setTotalDistance: Function;
  totalTime: number | null;
  setTotalTime: Function;
  loading: boolean;
  setLoading: Function;
}
