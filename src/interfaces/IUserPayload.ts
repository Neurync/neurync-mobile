import type { IDanger } from "./IDanger";
import type { IHelp } from "./IHelp";

export interface IUserPayload {
  id: string,
  name: string,
  email: string,
  about?: string;
  neurodivergence?: string;
  helps?: IHelp[];
  dangers?: IDanger[];
  token: string
}