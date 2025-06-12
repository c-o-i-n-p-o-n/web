import Bookmaker from "./Bookmaker";
import Currency from "./Currency";

export default interface SignedRecurrentVoucher {
  id: number;
  hid: string;
  description: string;
  hash?: string;
  createdAt?: Date;
  expiredAt?: number;
  logo?: string;
  photo?: string;
  status?: number;
  score?: number;
  recurrencesType: number;
  amountPerDue: number;
  cicles: number;
  period: number;
  timeUnit: string;
  bookmakers?: Bookmaker;
  currencies?: Currency;
}