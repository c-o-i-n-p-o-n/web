import Bookmaker from "./Bookmaker";

export default interface CurrencyCreation {
  acronym: string;
  hid: string;
  baseDescription: string;
  description: string;
  logo?: string;
  photo?: string;
  amount: number;
  expiredAt?: number;
  minAmount: number;
}
