import Option from "./Option";

export default interface Bet {
  id?: number;
  hid: string;
  description: string;
  odds: number;
  createdAt?: Date;
  options: Option;
  amount?: number;
  status: number;
  innerBets?: InnerBet[]
}

interface InnerBet  {
  id: number;
  description: string;
  odd: number;
}