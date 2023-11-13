export type TPin = "origin" | "destination" | "intermediary";

export interface IMapPin {
  label: string;
  pinType?: TPin;
}
