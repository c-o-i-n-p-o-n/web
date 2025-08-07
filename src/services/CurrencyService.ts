import { CurrenciesDataSource } from "../data/currencies.data-source";
import Bookmaker from "../models/Bookmaker";
import Currency from "../models/Currency";
import CurrencyCreation from "../models/CurrencyCreation";

export class CurrencyService {
    
    private currenciesDataSource: CurrenciesDataSource = new CurrenciesDataSource();
    
    public getURLRescue(currency: Currency, bookmaker: Bookmaker, amount: Number) {
        return this.currenciesDataSource.getURLRescue(currency,bookmaker,amount);
    }

    public async getCurrencyByVoucherId(voucherId: number): Promise<Currency> {
        console.log(voucherId)
        return await this.currenciesDataSource.getCurrencyByVoucherId(voucherId);
    }

    public async getCurrencyById(id?: number): Promise<Currency | null> {
        console.log(id)
        if(!!id){
            return await this.currenciesDataSource.getCurrencyById(id);
        }
        return null;
    }
    
    public async getMaxAmountByCurrencyId(id: number): Promise<number> {
        console.log(id)
        return await this.currenciesDataSource.getMaxAmountByCurrencyId(id);
    }
    
    public async getCurrenciesByQuery(query?:String): Promise<Currency[]> {
        return this.currenciesDataSource.getCurrenciesByQuery(query);
    }
    
    public async getCurrenciesWithFunds(query?:String): Promise<Currency[]> {
        return this.currenciesDataSource.getCurrenciesWithFundsByQuery(query);
    }
    
    public async getCurrencies(page: number, size: number): Promise<Currency[]> {
        return this.currenciesDataSource.getCurrencies(page, size);
    }
    
    public async getCurrenciesReceived(page: number, size: number): Promise<Currency[]> {
        return this.currenciesDataSource.getCurrenciesReceived(page, size);
    }
    
    public async getMyCurrencies(page: number, size: number): Promise<Currency[]> {
        return this.currenciesDataSource.getMyCurrencies(page, size);
    }

    public async createCurrency(currency: CurrencyCreation): Promise<Currency> {
        return this.currenciesDataSource.createCurrency(currency);
    };
}