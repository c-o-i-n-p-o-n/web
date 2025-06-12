import { CurrenciesDataSource } from "../data/currencies.data-source";
import { SignedRecurrentVouchersDataSource } from "../data/signed_recurrent-voucher.data-source";
import RecurrentVoucher from "../models/RecurrentVoucher";
import RecurrentVoucherCreation, { RecurrentVoucherToRecurrentVoucherCreation } from "../models/RecurrentVoucherCreation";

export class SignedRecurrentVoucherService {

    
    private signedRecurrentVouchersDataSource: SignedRecurrentVouchersDataSource = new SignedRecurrentVouchersDataSource();
    
    //tem que ser o provider para ter acesso a esta informacao
    public async getSignedRecurrentVouchersByRecurrentId(recurrent_id: number, page: number, size: number): Promise<RecurrentVoucher[]> {
        return this.signedRecurrentVouchersDataSource.getSignedRecurrentVouchersByRecurrentId(recurrent_id,page,size);
    }
    
    public async getSignedRecurrentVouchersByConsumerId(bookmaker_id: number, page: number, size: number): Promise<RecurrentVoucher[]> {
        return this.signedRecurrentVouchersDataSource.getSignedRecurrentVouchersByConsumerId(bookmaker_id,page,size);
    }

    // public async updateRecurrentVoucher(recurrentVoucher: RecurrentVoucher, changes: any): Promise<RecurrentVoucher> {
    //     var recurrentVoucherCreation: RecurrentVoucherCreation = RecurrentVoucherToRecurrentVoucherCreation(recurrentVoucher);
    //     recurrentVoucherCreation = {
    //         ...recurrentVoucherCreation,
    //         ...changes
    //     }
    //     return this.recurrentVouchersDataSource.updateRecurrentVoucher(recurrentVoucherCreation);
    // };


    
    // public async cancelRecurrentVoucher(hash: string): Promise<number> {
    //     console.log(hash)
    //     return await this.recurrentVouchersDataSource.cancelRecurrentVoucher(hash);
    // }

    public async getSignedRecurrentVoucherById(id: number): Promise<RecurrentVoucher> {
        console.log(id)
        return await this.signedRecurrentVouchersDataSource.getSignedRecurrentVoucherById(id);
    }
}