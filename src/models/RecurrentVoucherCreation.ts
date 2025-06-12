import Bookmaker from "./Bookmaker";
import Currency from "./Currency";
import RecurrentVoucher from "./RecurrentVoucher";

export default interface RecurrentVoucherCreation {
  id?: number;
  hid: string;
  description: string;
  logo?: string;
  photo?: string;
  expiredAt?: number;
  recurrencesType: number;
  cicles: number;
  amountPerDue: number;
  period: number;
  timeUnit:string;
  currency?: Currency;
  
}



export function RecurrentVoucherToRecurrentVoucherCreation (recurrentVoucher:RecurrentVoucher): RecurrentVoucherCreation{
  return {
      id: recurrentVoucher.id,
      hid: recurrentVoucher.hid,
      description: recurrentVoucher.description,
      logo: recurrentVoucher.logo,
      photo: recurrentVoucher.photo,
      expiredAt: recurrentVoucher.expiredAt,
      recurrencesType: recurrentVoucher.recurrencesType,
      cicles: recurrentVoucher.cicles,
      amountPerDue: recurrentVoucher.amountPerDue,
      period: recurrentVoucher.period,
      timeUnit: recurrentVoucher.timeUnit,
  }
}