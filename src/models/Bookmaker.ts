export default interface Bookmaker {
  id?: number;

  hid: string;
  description?: string;

  createdAt?: Date;

  logo?: string;
  photo?: string;
  score?: number;
  status?: number;
  type: string;
}