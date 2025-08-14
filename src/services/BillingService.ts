import { BillingDataSource } from "../data/billing.data-source";
import Bookmaker from "../models/Bookmaker";
import Currency from "../models/Currency";
import Billing from "../models/Billing";
import CurrencyCreation from "../models/CurrencyCreation";

export class BillingService {
    
    private billingDataSource: BillingDataSource = new BillingDataSource();
    
    public async pay(id: number): Promise<boolean> {
        return this.billingDataSource.pay(id);
    }

    public async check(id: number): Promise<boolean> {
        return this.billingDataSource.check(id);
    }
    
    public async getBillingBySignedRecurrentVoucherIdandPeriod
        (signedRecurrentVoucherId: number, signedRecurrentVoucherPeriod: number): Promise<Billing> {
        return this.billingDataSource.getBillingBySignedRecurrentVoucherIdandPeriod(signedRecurrentVoucherId,signedRecurrentVoucherPeriod);
    }

    //soh retorna paga o cedente ou o sacado
    public async getBillingsBySignedRecurrentVoucherId(signedRecurrentVoucherId: number, myBillingsPage: number, myBillingsListSize: number): Promise<Billing[]> {
      return this.billingDataSource.getBillingsBySignedRecurrentVoucherId(signedRecurrentVoucherId,myBillingsPage,myBillingsListSize);
    }
}