import type { GetUserById200DangersItem, GetUserById200HelpsItem } from "@/services/api/schemas";

export interface IUserPayload {
  id: string,
  name: string,
  email: string,
  about: string | null;
  neurodivergence: string | null;
  helps: GetUserById200HelpsItem[];
  dangers: GetUserById200DangersItem[];
  token: string
}