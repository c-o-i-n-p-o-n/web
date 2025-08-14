import Bookmaker from "./Bookmaker";
import Currency from "./Currency";
import Voucher from "./Voucher";

export default interface VoucherCreation {
  id?: number;
  hid: string;
  description: string;
  logo?: string;
  photo?: string;
  expiredAt?: number;
  vouchersType: number;
  amount: number;
  amountPerUser: number;
  currency?: Currency;
  currenciesReceived: Currency;
  cost: number;
  
}



export function voucherToVoucherCreation (voucher:Voucher): VoucherCreation{
  return {
      id: voucher.id,
      hid: voucher.hid,
      description: voucher.description,
      logo: voucher.logo,
      photo: voucher.photo,
      expiredAt: voucher.expiredAt,
      vouchersType: voucher.vouchersType,
      amount: 0,
      amountPerUser: voucher.amountPerUser,
      currenciesReceived: voucher.currenciesReceived,
      cost: voucher.cost
  }
}