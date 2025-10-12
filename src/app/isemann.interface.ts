import { Timestamp } from "rxjs";

export interface TemElement {
  time: Date;
  messurement: string;
  device: string;
  value: string;
};

export interface HumElement {
  time: Date;
  messurement: string;
  device: string;
  value: string;
};

export interface PreElement {
  time: Date;
  messurement: string;
  device: string;
  value: string;
};

export interface BatElement {
  time: Date;
  messurement: string;
  device: string;
  value: string;
};
