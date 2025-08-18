import Bookmaker from "./Bookmaker";
import Currency from "./Currency";

export default interface BookmakerCreation {
  id?: number;
  hid?: string;
  description?: string;
  logo?: string;
  photo?: string;
  classification?: string;
}



export function bookmakerToBookmakerCreation (bookmaker:Bookmaker): BookmakerCreation{
  return {
      id: bookmaker.id,
      hid: bookmaker.hid,
      description: bookmaker.description,
      classification: bookmaker.classification,
      logo: bookmaker.logo,
      photo: bookmaker.photo
  }
}
