import Bookmaker from "./Bookmaker";


export default interface Currency {
  id?: number;
  acronym: string;
  description: string;
  logo?: string;
  photo?: string;
  createdAt?: Date;
  expiredAt?: number;
  type?: number;
  maxAmount?: number;	
  isOwner?: boolean
}