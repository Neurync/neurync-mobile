import { SERVER_IP, SERVER_PORT } from "@/env";
import axios from "axios";

export const api = axios.create({
  baseURL: `http://${SERVER_IP}:${SERVER_PORT}`
});
