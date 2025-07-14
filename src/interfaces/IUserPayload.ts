export interface IUserPayload {
  id: string,
  name: string,
  email: string,
  about?: string;
  neurodivergence?: string;
  helps?: string[];
  dangers?: string[];
  token: string
}