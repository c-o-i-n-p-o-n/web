import { Endpoints } from "../core/constants/endpoints";
import { HttpClient } from "../core/http-client-adapter";
import Currency from "../models/Currency";
import CurrencyCreation from "../models/CurrencyCreation";

export class CurrenciesDataSource {

    private http: HttpClient = new HttpClient();

    public async getCurrencyByVoucherId(voucherId: number): Promise<Currency> {
        console.log(voucherId)
        const response = await this.http.getById(Endpoints.CURRENCIES_BYVOUCHER, voucherId);
        if (response.ok) {
            const currencyResponse = await response.json();
            console.log(currencyResponse);
            currencyResponse["createdAt"] = currencyResponse["createdAt"]?new Date(currencyResponse["createdAt"]).getDate():null;
            console.log(currencyResponse);
            return currencyResponse as Currency;
        } else {
            throw Error(response.statusText);
        }
    }

    public async getCurrenciesWithFundsByQuery(query?: String): Promise<Currency[]> {
        let params:any = {page:0, size:15};
        if(query){
            params = {query: query,...params};
        }
        console.log(params);
        const response = await this.http.get(Endpoints.CURRENCIES_ME_FILTER, params);
        if (response.ok) {
            const currenciesResponse = await response.json();
            console.log(currenciesResponse);
            if(!!currenciesResponse["_embedded"] && !!currenciesResponse["_embedded"]["currencies"]){
                console.log(currenciesResponse["_embedded"]["currencies"]);
                return currenciesResponse["_embedded"]["currencies"] as Currency[];
            }else{
                return [];
            }
        } else {
            throw Error(response.statusText);
        }
    }

    public async getCurrenciesByQuery(query?: String): Promise<Currency[]> {
        let params:any = {page:0, size:15};
        if(query){
            params = {query: query,...params};
        }
        console.log(params);
        const response = await this.http.get(Endpoints.CURRENCIES_FILTER, params);
        if (response.ok) {
            const currenciesResponse = await response.json();
            console.log(currenciesResponse);
            if(!!currenciesResponse["_embedded"] && !!currenciesResponse["_embedded"]["currencies"]){
                console.log(currenciesResponse["_embedded"]["currencies"]);
                return currenciesResponse["_embedded"]["currencies"] as Currency[];
            }else{
                return [];
            }
        } else {
            throw Error(response.statusText);
        }
    }

    public async createCurrency(currency: CurrencyCreation): Promise<Currency> {

        const currencyObj = {
            acronym: currency.acronym,
            hid: currency.hid,
            description: currency.baseDescription + "\n\n" + currency.description,
            logo: currency.logo,
            photo: currency.photo,
            amount: currency.amount,
            expiredAt: currency.expiredAt,
            minAmount: currency.minAmount// == 1?-100000000:0
        };
        console.log(currency);
        console.log(currencyObj);
        const response = await this.http.post(Endpoints.CURRENCIES, currencyObj);
        console.log(response);
        if (response.ok) {
            const currencyResponse = await response.json();
            return currencyResponse as Currency;
        } else {
            throw Error(response.statusText);
        }
    }

}