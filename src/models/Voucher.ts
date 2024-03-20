import Bookmaker from "./Bookmaker";

export enum VoucherStatus {
  OPEN = 0,
  FINISHED = 1,
  CANCELED = 2,
}

export default interface Voucher {
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
  vouchersType: number;
  amountPerUser: number;
  bookmakers?: Bookmaker;
  bookmakersConsumer?: Bookmaker;
}