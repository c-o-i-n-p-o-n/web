import { PaymentWayJoinDataSource } from "../data/payment_way_join.data-source";
import PaymentWay from "../models/PaymentWay";
import PaymentWayJoin from "../models/PaymentWayJoin";
import PaymentWayJoinCreation, { PaymentWayJoinToPaymentWayJoinCreation } from "../models/PaymentWayJoinCreation";

export class PaymentWayJoinService {
    
    private paymentWayJoinDataSource: PaymentWayJoinDataSource = new PaymentWayJoinDataSource();

    public async joinPaymentWay(paymentWay?: PaymentWayJoin, changes?: PaymentWayJoinCreation): Promise<PaymentWayJoin> {
        var paymentWayCreation: PaymentWayJoinCreation = PaymentWayJoinToPaymentWayJoinCreation(paymentWay,changes);
        //paymentWayCreation = {
        //    ...paymentWayCreation,
        //    ...changes
        //}
        return this.paymentWayJoinDataSource.updateOrJoinPaymentWay(paymentWayCreation);
    }

    public async getPaymentWayJoinByPaymentWayId(paymentWayId: number): Promise<PaymentWayJoin | undefined> {
        console.log(paymentWayId);
        if(!!paymentWayId){
            return await this.paymentWayJoinDataSource.getPaymentWayJoinByPaymentWayId(paymentWayId);
        }
        return undefined;
    }
}