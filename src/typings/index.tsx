import { StaticImageData } from "next/image";

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