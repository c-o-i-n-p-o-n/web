import { CurrenciesDataSource } from "../data/currencies.data-source";
import { VouchersBillingDataSource } from "../data/vouchers_billing.data-source";
import Transference from "../models/Transference";
import Voucher from "../models/Voucher";
import VoucherBilling from "../models/VoucherBilling";
import VoucherCreation, { voucherToVoucherCreation } from "../models/VoucherCreation";

export class VoucherBillingService {
    
    private vouchersBillingDataSource: VouchersBillingDataSource = new VouchersBillingDataSource();
    
    public async getVoucherBillingsByVoucherIdAndQueryAndPageAndSize(id: number, page: number, size: number, queryStr?:string): Promise<VoucherBilling[]>{

        return this.vouchersBillingDataSource.getVoucherBillingsByVoucherIdAndQueryAndPageAndSize(id,page,size,queryStr);
    }

    public async getVoucherBillingById(voucherBillingId?: number): Promise<VoucherBilling | undefined> {
        console.log(voucherBillingId)
        if(!!voucherBillingId){
            return await this.vouchersBillingDataSource.getVoucherBillingById(voucherBillingId);
        }
        return undefined;
    }

    public async check(id: number) : Promise<boolean> {
        console.log(id)
        return await this.vouchersBillingDataSource.check(id);
    }

    
    public async validVoucherBilling(id: number) : Promise<string> {
        console.log(id)
        return await this.vouchersBillingDataSource.validVoucherBilling(id);
    }
}