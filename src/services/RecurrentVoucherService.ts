import { CurrenciesDataSource } from "../data/currencies.data-source";
import { RecurrentVouchersDataSource } from "../data/recurrent-voucher.data-source";
import RecurrentVoucher from "../models/RecurrentVoucher";
import RecurrentVoucherCreation, { RecurrentVoucherToRecurrentVoucherCreation } from "../models/RecurrentVoucherCreation";

export class RecurrentVoucherService {
    
    private recurrentVouchersDataSource: RecurrentVouchersDataSource = new RecurrentVouchersDataSource();
    
    public async getMyRecurrentVouchers(page: number, size: number): Promise<RecurrentVoucher[]> {
        return this.recurrentVouchersDataSource.getMyRecurrentVouchers(page,size);
    }

    public async getRecurrentVouchers(page: number, size: number, query?:String): Promise<RecurrentVoucher[]> {
        return this.recurrentVouchersDataSource.getRecurrentVouchersByQuery(page,size,query);
    }
    
    public async getTotalAmountPerDueById(id: number): Promise<number> {
        return this.recurrentVouchersDataSource.getTotalAmountPerDueById(id);
    }

    public async createRecurrentVoucher(recurrentVoucher: RecurrentVoucherCreation): Promise<RecurrentVoucher> {
        console.log(recurrentVoucher.period)
        let duration = recurrentVoucher.period / (1000 * 60 * 60 * 24)
        console.log(duration)
        if (duration == 360){
            recurrentVoucher.timeUnit = "YEAR";
            recurrentVoucher.period = 1;
        }else if (duration == 180){
            recurrentVoucher.timeUnit = "MONTH";
            recurrentVoucher.period = 6;
        }else if (duration == 90){
            recurrentVoucher.timeUnit = "MONTH";
            recurrentVoucher.period = 3;
        }else if (duration == 60){
            recurrentVoucher.timeUnit = "MONTH";
            recurrentVoucher.period = 2;
        }else if (duration == 30){
            recurrentVoucher.timeUnit = "MONTH";
            recurrentVoucher.period = 1;
        }else if (duration == 15){
            recurrentVoucher.timeUnit = "HALF MONTH";
            recurrentVoucher.period = 1;
        }else if (duration == 7){
            recurrentVoucher.timeUnit = "WEEK";
            recurrentVoucher.period = 1;
        }else if (duration == 2){
            recurrentVoucher.timeUnit = "DAY";
            recurrentVoucher.period = 2;
        }else if (duration == 1){
            recurrentVoucher.timeUnit = "DAY";
            recurrentVoucher.period = 1;
        }else{
            recurrentVoucher.timeUnit = "DAY";
            recurrentVoucher.period = 0;
        }
        console.log(recurrentVoucher)
        return this.recurrentVouchersDataSource.createRecurrentVoucher(recurrentVoucher);
    };    

    public async updateRecurrentVoucher(recurrentVoucher: RecurrentVoucher, changes: any): Promise<RecurrentVoucher> {
        var recurrentVoucherCreation: RecurrentVoucherCreation = RecurrentVoucherToRecurrentVoucherCreation(recurrentVoucher);
        recurrentVoucherCreation = {
            ...recurrentVoucherCreation,
            ...changes
        }
        return this.recurrentVouchersDataSource.updateRecurrentVoucher(recurrentVoucherCreation);
    };


    
    public async cancelRecurrentVoucher(hash: string): Promise<number> {
        console.log(hash)
        return await this.recurrentVouchersDataSource.cancelRecurrentVoucher(hash);
    }

    public async hireRecurrentVoucher(hash: string): Promise<boolean> {
        console.log(hash)
        return await this.recurrentVouchersDataSource.hireRecurrentVoucher(hash);
    }

    public async getRecurrentVoucherById(id?: number): Promise<RecurrentVoucher | undefined> {
        console.log(id)
        if(!!id){
            return await this.recurrentVouchersDataSource.getRecurrentVoucherById(id);
        }
        return undefined;
    }

    public async getRecurrentVoucherByHash(hash: string) {
        console.log(hash)
        return await this.recurrentVouchersDataSource.getRecurrentVoucherByHash(hash);
    }
}