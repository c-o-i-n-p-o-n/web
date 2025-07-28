import Bookmaker from "./Bookmaker";
import Currency from "./Currency";

export enum RecurrentVoucherStatus {
  OPEN = 0,
  FINISHED = 1,
  CANCELED = 2,
}

export default interface RecurrentVoucher {
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
  currenciesReceived: Currency;
  isOwner?: number;
  cost: number;
}