import Bookmaker from "./Bookmaker";
import PaymentWayJoin from "./PaymentWayJoin";
import Transference from "./Transference";
import Voucher from "./Voucher";

export default interface VoucherBilling {
  id: number;
  key?: string;
  createdAt: Date;
  
  bookmakers: Bookmaker;
  transferences?: Transference;
  vouchers: Voucher;
  paymentWayJoins: PaymentWayJoin;
}