import { Endpoints } from "../core/constants/endpoints";
import { HttpClient } from "../core/http-client-adapter";
import Capsule from "../models/Capsule";
import PaymentWay from "../models/PaymentWay";

export class PaymentWayDataSource {

    private http: HttpClient = new HttpClient();

    public async getPaymentWays(page: number, size: number): Promise<PaymentWay[]> {
        let params:any = {page:page|0, size:size|15};

        console.log(params);
        const response = await this.http.get(Endpoints.PAYMENT_WAYS_FILTER, params);
        if (response.ok) {
            const capsule  = await response.json() as Capsule;
            console.log(capsule);
            
            if(capsule.code == "00000"){
                console.log(capsule.data["_embedded"]["payment_ways"]);
                const paymentWays = capsule.data["_embedded"]["payment_ways"] as PaymentWay[];
                console.log(paymentWays);
                return paymentWays;
            }else{
                throw Error(capsule.message);
            }
        } else {
            throw Error(response.statusText);
        }
    }

    public async getPaymentWayById(paymentWayId: number): Promise<PaymentWay> {
        console.log(paymentWayId)
        let params:any = {paymentWaysId: paymentWayId};
        const response = await this.http.getById(Endpoints.PAYMENT_WAYS, paymentWayId);
        if (response.ok) {
            const capsule  = await response.json() as Capsule;
            console.log(capsule.code);
            console.log(capsule.data);
            if(capsule.code == "00000"){
                capsule.data["createdAt"] = capsule.data["createdAt"]?new Date(capsule.data["createdAt"]):null;
                const paymentWay = capsule.data as PaymentWay;                
                return paymentWay;
            }else{
                throw Error(capsule.message);
            }
        } else {
            throw Error(response.statusText);
        }
    }

}