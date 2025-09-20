import { PaymentWayDataSource } from "../data/payment_way.data-source";
import Bookmaker from "../models/Bookmaker";
import PaymentWay from "../models/PaymentWay";

export class PaymentWayService {
    
    private paymentWayDataSource: PaymentWayDataSource = new PaymentWayDataSource();

    public async getPaymentWays(page: number, size: number): Promise<PaymentWay[]> {

        return this.paymentWayDataSource.getPaymentWays(page,size);

    }

    public async getPaymentWayById(paymentWayId: number): Promise<PaymentWay | undefined> {
        console.log(paymentWayId);
        if(!!paymentWayId){
            return await this.paymentWayDataSource.getPaymentWayById(paymentWayId);
        }
        return undefined;
    }
}