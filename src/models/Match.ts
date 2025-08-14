import Bookmaker from "./Bookmaker";
import Option from "./Option";
import Currency from "./Currency";
import Event from "./Event";

export default interface Match {
  id?: number;

  hid: string;
  description?: string;

  createdAt?: Date;
  expiredAt?: number;
  options?: Option[];

  logo?: string;
  photo?: string;
  visibility: number;
  score?: number;
  status?: number;
  //maxAmmount?: number;

  events?: Event;
  bookmakers?: Bookmaker;
  currencies?: Currency
}