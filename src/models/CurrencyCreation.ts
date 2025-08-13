import Bookmaker from "./Bookmaker";
import Currency from "./Currency";

export default interface CurrencyCreation {
  id?: number;
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



export function currencyToCurrencyCreation (currency:Currency): CurrencyCreation{
  return {
      id: currency.id,
      acronym: currency.acronym,
      hid: currency.hid?currency.hid:currency.acronym,
      baseDescription: "",
      description: currency.description,
      logo: currency.logo,
      photo: currency.photo,
      amount: (currency.validAmount?currency.validAmount:0) + (currency.expiredAmount?currency.expiredAmount:0),
      expiredAt: currency.expiredAt,
      minAmount: 0
  }
}
