import Bookmaker from "./Bookmaker";
import Currency from "./Currency";


export default interface PaymentWay {
  id: number;
  provider: string;
  logo_url: string;	
  doIHaveIt?: number;	
  isItMain?: number;
}


export function paymentWayName (provider: string | undefined):string | undefined {

    let name = provider;
    
    switch (provider) {
        case "Account":            
            return "Só pagar com saldo";
        case "PixManual":            
            return "Pix sem comprovação";
        case "InfinitePay":            
            return "Receber com conta InfinitePay";
        case "MercadoPago":            
            return "Receber com conta MercadoPago";
    
        default:
            return undefined;
    }


    return name;
};