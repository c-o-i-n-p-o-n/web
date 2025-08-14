import Currency from "./Currency";
import Event from "./Event";
import Match from "./Match";

export interface MatchCreation {
    id?: number;
    hid: string;
    description?: string;
    photo?: string;
    logo?: string;
    visibility: number;
    expiredAt?: number;
    event?: Event;
    currency?: Currency;
    maxAmmount?: number;
}

export function matchToMatchCreation (match:Match): MatchCreation{
    return {
        id: match.id,
        hid: match.hid,
        description: match.description,
        photo: match.photo,
        visibility: match.visibility,
        expiredAt: match.expiredAt,
        event: match.events,
        currency: match.currencies,
    }
}
