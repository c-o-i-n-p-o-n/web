import Currency from "./Currency";
import Transference from "./Transference";

export interface TransferenceCreation {
    amount: number;
    senderId?: number;	
    receiverId?: number;	
    currenciesId: number
}

interface TransferenceAux extends Transference {
    currencies: CurrencyAux;	
}

interface CurrencyAux extends Currency {
    id: number;	
}

export function transferenceToTransferenceCreation (transference:TransferenceAux): TransferenceCreation{
    return {
        amount: transference.amount,
        senderId: transference.sender?.id,
        receiverId: transference.receiver?.id,
        currenciesId: transference.currencies.id
    }
}
