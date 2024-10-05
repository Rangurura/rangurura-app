/* eslint-disable @typescript-eslint/no-explicit-any */
import { StaticImageData } from "next/image";
export type User = {
  image: StaticImageData;
  name: string;
  email: string;
  id: number;
  role: string;
  location: {
    city: string;
    country: string;
    province: string;
    district: string;
    cell: string;
    village: string;
  };
};
export type Problem = {
  level: string;
  completed: boolean;
  ikibazo: string;
  urwego: string;
  owner: string;
  proofUrl: string;
  recordUrl: string;
  status: string;
  category: string;
  phoneNumber: string;
  document: string;
  id: string;
  longitude: number;
  latitude: number;
  target: string;
};
export type Suggestion = {
  id: string;
  igitekerezo: string;
  level: string;
  status: string;
  urwego: string;
  location: string;
};

export type Chat = {
  image: StaticImageData;
  user: string;
  time: string;
  latestMessage: string;
  id: number;
  status: string;
};

export type Event = {
  startDateTime: any;
  endDateTime: any;
  eventName: string;
  location: string;
  completed: boolean;
  descriptions: string;
  owner: string;
  id: string;
  organizationLevel: string;
  category: string;
};
export type Report = {
  id: any;
  name: string;
  nationalId: number;
  summary: string;
  location: string;
  organizationLevel: string;
  description: string;
};

export interface Route {
  icon: React.ComponentType<any>;
  activeIcon: React.ComponentType<any>;
  name: string;
  path: string;
}

export type District = {
  name: string;
  problems: number | string;
  suggestions: number | string;
  leader: string;
};
