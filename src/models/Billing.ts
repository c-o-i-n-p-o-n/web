import Bookmaker from "./Bookmaker";
import Currency from "./Currency";
import SignedRecurrentVoucher from "./SignedRecurrentVoucher";

export default interface Billing {
  id: number;
  description: string;
  createdAt: Date;
  paidAt?: number;
  dueAt: number;
  status: number;
  currentCicle: number;
  amount: number;
  cost:number;
  bookmakers?: Bookmaker;
  signedRecurrences?: SignedRecurrentVoucher;
  isPayer: number;
}