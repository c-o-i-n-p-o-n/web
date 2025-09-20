export default interface Bookmaker {
  id?: number;

  hid: string;
  description?: string;

  createdAt?: Date;

  classification?: string;
  govNumber?: string;//soh vem sefor o dono
  itIsMe?: number;

  logo?: string;
  photo?: string;
  score?: number;
  status?: number;
  type: string;
}