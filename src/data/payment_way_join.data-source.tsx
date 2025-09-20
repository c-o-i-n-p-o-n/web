import { Endpoints } from "../core/constants/endpoints";
import { HttpClient } from "../core/http-client-adapter";
import Capsule from "../models/Capsule";
import PaymentWay from "../models/PaymentWay";
import PaymentWayJoin from "../models/PaymentWayJoin";
import PaymentWayJoinCreation from "../models/PaymentWayJoinCreation";

export class PaymentWayJoinDataSource {

    private http: HttpClient = new HttpClient();

    public async updateOrJoinPaymentWay(paymentWayJoinCreation: PaymentWayJoinCreation): Promise<PaymentWayJoin> {
        const paymentWayJoinObj = {
            id: paymentWayJoinCreation.id,
            paymentWaysId: paymentWayJoinCreation.paymentWay?.id,
            main: paymentWayJoinCreation.main,
            phoneMessage: paymentWayJoinCreation.phoneMessage,
            financialKey: paymentWayJoinCreation.financialKey
        };
        console.log(paymentWayJoinCreation);
        console.log(paymentWayJoinObj);
        const response = await this.http.put(Endpoints.PAYMENT_WAY_JOINS, paymentWayJoinObj);
        console.log(response);
        if (response.ok) {
            const paymentWayJoinResponse = await response.json();
            paymentWayJoinResponse["createdAt"] = paymentWayJoinResponse["createdAt"]?new Date(paymentWayJoinResponse["createdAt"]):null;            
            return paymentWayJoinResponse as PaymentWayJoin;
        } else {
            throw Error(response.statusText);
        }
    }

    public async getPaymentWayJoinByPaymentWayId(paymentWayId: number): Promise<PaymentWayJoin> {
        console.log(paymentWayId)
        let params:any = {paymentWaysId: paymentWayId};
        const response = await this.http.get(Endpoints.PAYMENT_WAY_JOINS, params);
        if (response.ok) {
            const capsule  = await response.json() as Capsule;
            console.log(capsule.code);
            console.log(capsule.data);
            if(capsule.code == "00000"){
                capsule.data["createdAt"] = capsule.data["createdAt"]?new Date(capsule.data["createdAt"]):null;
                const paymentWayJoin = capsule.data as PaymentWayJoin;                
                return paymentWayJoin;
            }else{
                throw Error(capsule.message);
            }
        } else {
            throw Error(response.statusText);
        }
    }
}