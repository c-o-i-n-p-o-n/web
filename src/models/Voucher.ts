import Bookmaker from "./Bookmaker";
import Currency from "./Currency";

export enum VoucherStatus {
  OPEN = 1,
  FINISHED = 0,
  CANCELED = 2,
}

export default interface Voucher {
  id: number;
  hid: string;
  description: string;
  hash: string;
  createdAt?: Date;
  expiredAt?: number;
  logo?: string;
  photo?: string;
  status?: number;
  score?: number;
  vouchersType: number;
  amountPerUser: number;
  bookmakers?: Bookmaker;
  currencies?: Currency;
  currenciesReceived: Currency;
  isOwner?: number;
  cost: number;
}