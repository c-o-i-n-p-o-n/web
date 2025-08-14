import Category from "./Category";
import Match from "./Match";
import { User } from "./User";

export default interface Event {
  id?: number;
  hid: string;
  hid2?: string;
  hid3?: string;
  hid4?: string;
  hid5?: string;
  description?: string;
  logo?: string;
  photo?: string;
  createdAt?: Date;
  status?: number;
  score?: number;

  beginningAt?: Date;
  duration?: number;
  categories?: Category[];
  matches?: Match[];
  user?: User
}