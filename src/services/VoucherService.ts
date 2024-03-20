import { CurrenciesDataSource } from "../data/currencies.data-source";
import { VouchersDataSource } from "../data/vouchers.data-source";
import Voucher from "../models/Voucher";
import VoucherCreation, { voucherToVoucherCreation } from "../models/VoucherCreation";

export class VoucherService {

    public async cancelVoucher(hash: string): Promise<number> {
        console.log(hash)
        return await this.vouchersDataSource.cancelVoucher(hash);
    }

    public async checkVoucherTaken(hash: string): Promise<boolean> {
        console.log(hash)
        return await this.vouchersDataSource.checkVoucherTaken(hash);
    }

    public async takeVoucher(hash: string): Promise<boolean> {
        console.log(hash)
        return await this.vouchersDataSource.takeVoucher(hash);
    }

    public async getVoucherById(id: number): Promise<Voucher> {
        console.log(id)
        return await this.vouchersDataSource.getVoucherById(id);
    }
    
    private vouchersDataSource: VouchersDataSource = new VouchersDataSource();
    
    public async getVouchers(query?:String): Promise<Voucher[]> {
        return this.vouchersDataSource.getVouchersByQuery(query);
    }

    public async createVoucher(voucher: VoucherCreation): Promise<Voucher> {
        return this.vouchersDataSource.createVoucher(voucher);
    };    

    public async updateVoucher(voucher: Voucher, changes: any): Promise<Voucher> {
        var voucherCreation: VoucherCreation = voucherToVoucherCreation(voucher);
        voucherCreation = {
            ...voucherCreation,
            ...changes
        }
        return this.vouchersDataSource.updateVoucher(voucherCreation);
    };
}