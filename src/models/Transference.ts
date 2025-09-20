import Bookmaker from "./Bookmaker";
import Currency from "./Currency";


export default interface Transference {
  id: number;
  amount: number;
  sender?: Bookmaker;	
  receiver?: Bookmaker;	
  currencies: Currency;	
  expiredAt: Date;
  createdAt: Date;
  status: string;
  hash: string;
  type: number;
}