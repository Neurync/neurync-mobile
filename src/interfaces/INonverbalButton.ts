import { GetUserNonverbalMessages200Item } from "@/services/api/schemas";

export interface INonverbalButton {
  id: string;
  emoji: string;
  description: string;
  isFavorited: boolean;
  data: GetUserNonverbalMessages200Item[];
  setData: (data: GetUserNonverbalMessages200Item[]) => void;
}