import Bookmaker from "./Bookmaker";


export default interface Currency {
  id?: number;
  hid?: string;
  acronym: string;
  description: string;
  logo?: string;
  photo?: string;
  createdAt?: Date;
  expiredAt?: number;
  currenciesType?: number;
  maxAmount?: number;	
  validAmount?: number;	
  expiredAmount?: number;	
  status?: number;
  isOwner?: number;
}