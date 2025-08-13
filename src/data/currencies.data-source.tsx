import { Endpoints } from "../core/constants/endpoints";
import { HttpClient } from "../core/http-client-adapter";
import Bookmaker from "../models/Bookmaker";
import Capsule from "../models/Capsule";
import Currency from "../models/Currency";
import CurrencyCreation from "../models/CurrencyCreation";

export class CurrenciesDataSource {

    private http: HttpClient = new HttpClient();

    public getURLRescue(currency: Currency, bookmaker: Bookmaker, amount: Number) {
        return this.http.getFullUrl(Endpoints.CURRENCY_CHECK_RESCUE,{currency:currency.id, bookmaker:bookmaker.id, amount:amount});
    }

    public async updateCurrency(currency: CurrencyCreation): Promise<Currency> {
        const currencyObj = {
            id: currency.id,
            hid: currency.hid,
            //description: voucher.description,
            logo: currency.logo,
            photo: currency.photo//,
            //expiredAt: voucher.expiredAt,
            //vouchersType: voucher.vouchersType,
            //amountPerUser: voucher.amountPerUser
        };
        console.log(currency);
        console.log(currencyObj);
        const response = await this.http.put(Endpoints.CURRENCIES, currencyObj);
        console.log(response);
        if (response.ok) {
            const capsule = await response.json() as Capsule;
            //const currencyResponse = await response.json();
            console.log(capsule);
            if(capsule.code == "00000"){
                console.log(capsule.data as Currency);
                capsule.data["createdAt"] = capsule.data["createdAt"]?new Date(capsule.data["createdAt"]):null;            
                return capsule.data as Currency;
            }else{
                throw Error(capsule.message);
            }
            //currencyResponse["createdAt"] = currencyResponse["createdAt"]?new Date(currencyResponse["createdAt"]):null;            
            //return currencyResponse as Currency;
        } else {
            throw Error(response.statusText);
        }
    }

    public async getNonDistributedCurrencyByIdCurrencyId(currencyId: number): Promise<number> {
        console.log(currencyId)
        const response = await this.http.getById(Endpoints.CURRENCY_DISTRIBUTED, currencyId);
        if (response.ok) {
            const capsule = await response.json() as Capsule;
            console.log(capsule);
            if(capsule.code == "00000"){
                return capsule.data as number;
            }else{
                throw Error(capsule.message);
            }
        } else {
            throw Error(response.statusText);
        }


        
    }

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

    public async getCurrencies(page: number, size: number): Promise<Currency[]> {
        let params:any = {page:page, size:size};
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

    
    public async getCurrenciesReceived(page: number, size: number): Promise<Currency[]> {
        let params:any = {page:page, size:size};
        console.log(params);
        const response = await this.http.get(Endpoints.CURRENCIES_RECEIVED_FILTER, params);

        if (response.ok) {
            const capsule = await response.json() as Capsule;
            console.log(capsule);
            if(capsule.code == "00000"){
                console.log(capsule.data as Currency[]);
                return capsule.data as Currency[];
            }else{
                throw Error(capsule.message);
            }
        } else {
            throw Error(response.statusText);
        }

        // if (response.ok) {
        //     const currenciesResponse = await response.json();
        //     console.log(currenciesResponse);
        //     if(!!currenciesResponse["_embedded"] && !!currenciesResponse["_embedded"]["currencies"]){
        //         console.log(currenciesResponse["_embedded"]["currencies"]);
        //         return currenciesResponse["_embedded"]["currencies"] as Currency[];
        //     }else{
        //         return [];
        //     }
        // } else {
        //     throw Error(response.statusText);
        // }
    }

    public async getMyCurrencies(page: number, size: number): Promise<Currency[]> {
        let params:any = {page:page, size:size};
        console.log(params);
        const response = await this.http.get(Endpoints.CURRENCIES_MY_FILTER, params);
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
                //return [];
                throw Error("Você não tem cupons para distribuir. Crie seus cupons ou adquira novos cupons");
            }
        } else {
            throw Error(response.statusText + " " + response.statusText);
        }
    }

    public async getMaxAmountByCurrencyId(id: number): Promise<number> {
        console.log(id)
        const response = await this.http.getById(Endpoints.CURRENCY_AMOUNT, id);
        if (response.ok) {
            const capsule = await response.json() as Capsule;
            console.log(capsule);
            if(capsule.code == "00000"){
                return capsule.data as number;
            }else{
                throw Error(capsule.message);
            }
        } else {
            throw Error(response.statusText);
        }


        
        // console.log(currencyId);
        // const response = await this.http.get(Endpoints.CURRENCY_AMOUNT, transference);
        // console.log(response);
        // if (response.ok) {
        //     const capsule = await response.json() as Capsule;
        //     console.log(capsule);
        //     if(capsule.code == "00000"){
        //         return capsule.data as Transference;
        //     }else{
        //         throw Error(capsule.message);
        //     }
        // } else {
        //     throw Error(response.statusText);
        // }
    }
    
    public async getCurrencyById(id: number): Promise<Currency> {
        console.log(id)
        const response = await this.http.getById(Endpoints.CURRENCIES, id);
        if (response.ok) {
            const currenciesResponse = await response.json();
            console.log(currenciesResponse);
            currenciesResponse["createdAt"] = currenciesResponse["createdAt"]?new Date(currenciesResponse["createdAt"]):null;
            console.log(currenciesResponse);
            return currenciesResponse as Currency;
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