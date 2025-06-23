import { jwtDecode } from "jwt-decode";

interface UserPayload {
  id: string,
  name: string,
  email: string,
  password: string
}

export function decodeUserLoginToken(token: string): UserPayload {
  return jwtDecode(token);
}