import { CurrenciesDataSource } from "../data/currencies.data-source";
import { VouchersDataSource } from "../data/vouchers.data-source";
import Voucher from "../models/Voucher";
import VoucherCreation, { voucherToVoucherCreation } from "../models/VoucherCreation";

export class VoucherService {
    
    private vouchersDataSource: VouchersDataSource = new VouchersDataSource();

    public async assignMoreCoin(id: number, amount: number) {
        console.log(id)
        console.log(amount)
        return await this.vouchersDataSource.assignMoreCoin(id,amount);
    }

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
    
    public async getTotalAmountAvailableById(id: number): Promise<number> {
        console.log(id)
        return await this.vouchersDataSource.getTotalAmountAvailableById(id);
    }
    
    public async getTotalAmountById(id: number): Promise<number> {
        console.log(id)
        return await this.vouchersDataSource.getTotalAmountById(id);        
    }

    public async getVouchers( page: number, size: number, query?:String,): Promise<Voucher[]> {
        return this.vouchersDataSource.getVouchers(page,size,query);
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