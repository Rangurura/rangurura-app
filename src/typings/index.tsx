import { StaticImageData } from "next/image";
import { IconType } from "react-icons";

export type Problem = {
  description: string;
  level: string;
  completed: boolean;
};

export type Chat = {
  image: StaticImageData,
  user: string,
  time: string,
  latestMessage: string,
  id: number,
  status: string
}

export type Event = {
  name: string,
  startDate: string,
  endDate: string,
  location: string,
  duration: string,
  completed: boolean
}

export interface Route   {
  icon: React.ComponentType<any>,
  activeIcon: React.ComponentType<any>,
  name: string,
  path: string,
}