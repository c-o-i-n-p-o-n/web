import Bookmaker from "./Bookmaker";
import Currency from "./Currency";

export default interface BookmakerCreation {
  id?: number;
  hid?: string;
  description?: string;
  logo?: string;
  photo?: string;
  classification?: string;
  state?: string;
  govNumber?: string;
  country?: string;
  city?: string;
  address?: string;//soh vem sefor o dono
  addressNumber?: string;//soh vem sefor o dono
  neighborhood?: string;//soh vem sefor o dono
  zipCode?: string;//soh vem sefor o dono
}



export function bookmakerToBookmakerCreation (bookmaker:Bookmaker): BookmakerCreation{
  return {
      id: bookmaker.id,
      hid: bookmaker.hid,
      description: bookmaker.description,
      classification: bookmaker.classification,
      logo: bookmaker.logo,
      photo: bookmaker.photo,
      state: bookmaker.state,
      country: bookmaker.country,
      city: bookmaker.city,
      address: bookmaker.address,
      addressNumber: bookmaker.addressNumber,
      neighborhood: bookmaker.neighborhood,
      zipCode: bookmaker.zipCode
  }
}
