import { TransferenceDataSource } from "../data/transference.data-source";
import Bookmaker from "../models/Bookmaker";
import Currency from "../models/Currency";
import Transference from "../models/Transference";
import CurrencyCreation from "../models/CurrencyCreation";

export class TransferenceService {
    
    private transferencesDataSource: TransferenceDataSource = new TransferenceDataSource();
    
    public getURLRescue(hash: string) {
        return this.transferencesDataSource.getURLRescue(hash);
    }

    public async pay(hash: string): Promise<boolean> {
        return this.transferencesDataSource.pay(hash);
    }

    public async genereteReceive(currency: Currency, amount: number): Promise<Transference> {
        const newLy = await this.transferencesDataSource.genereteReceive(currency,amount) as Transference;
        return this.transferencesDataSource.getById(newLy.id);
    }

    public async check(hash: string): Promise<boolean> {
        return this.transferencesDataSource.check(hash);
    }

    public async getTransferenceByHash(hash: string): Promise<Transference> {
        return this.transferencesDataSource.getTransferenceByHash(hash);
    }
}