import { CurrenciesDataSource } from "../data/currencies.data-source";
import Currency from "../models/Currency";
import CurrencyCreation from "../models/CurrencyCreation";

export class CurrencyService {
    
    private currenciesDataSource: CurrenciesDataSource = new CurrenciesDataSource();

    public async getCurrencyByVoucherId(voucherId: number): Promise<Currency> {
        console.log(voucherId)
        return await this.currenciesDataSource.getCurrencyByVoucherId(voucherId);
    }
    
    public async getCurrencies(query?:String): Promise<Currency[]> {
        return this.currenciesDataSource.getCurrenciesByQuery(query);
    }
    
    public async getMyCurrencies(query?:String): Promise<Currency[]> {
        return this.currenciesDataSource.getCurrenciesWithFundsByQuery(query);
    }

    public async createCurrency(currency: CurrencyCreation): Promise<Currency> {
        return this.currenciesDataSource.createCurrency(currency);
    };
}