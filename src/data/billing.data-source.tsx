import { Endpoints } from "../core/constants/endpoints";
import { HttpClient } from "../core/http-client-adapter";
import Billing from "../models/Billing";
import Capsule from "../models/Capsule";
import Currency from "../models/Currency";
import Match from "../models/Match";
import {MatchCreation} from "../models/MatchCreation";
import Transference from "../models/Transference";
import { TransferenceCreation } from "../models/TransferenceCreation";

export class BillingDataSource {

    private http: HttpClient = new HttpClient();

    public async pay(id: number): Promise<boolean> {
        const params = {
            id: id
        };
        console.log(params);
        const response = await this.http.post(Endpoints.BILLING_PAY, params);
        console.log(response);
        if (response.ok) {
            const capsule = await response.json() as Capsule;
            console.log(capsule);
            if(capsule.code == "00000"){
                return true;
            }else{
                throw Error(capsule.message);
            }
        } else {
            throw Error(response.statusText);
        }
    }

    
    public async check(id: number): Promise<boolean> {
        let params:any = {id:id};
        console.log(params);
        const response = await this.http.get(Endpoints.BILLING_CHECK, params);
        if (response.ok) {
            const capsule  = await response.json() as Capsule;
            console.log(capsule);
            if(capsule.code == "00000"){
                return true;
            }else{
                throw Error(capsule.message);
            }
        } else {
            throw Error(response.statusText);
        }
    }

    public async getBillingBySignedRecurrentVoucherIdandPeriod
            (signedRecurrentVoucherId: number, signedRecurrentVoucherPeriod: number): Promise<Billing>{
        let params:any = {
            signedRecurrentVoucherId:signedRecurrentVoucherId,
            signedRecurrentVoucherPeriod:signedRecurrentVoucherPeriod
        };
        //console.log(params);
        const response = await this.http.get(Endpoints.BILLING_SIGNED_VOUCER_AND_PERIOD, params);
        if (response.ok) {
            const capsule  = await response.json() as Capsule;
            //console.log(capsule);
            if(capsule.code == "00000"){
                const billing = capsule.data as Billing;
                return billing;
            }else{
                throw Error(capsule.message);
            }
        } else {
            throw Error(response.statusText);
        }
    }

    public async getBillingsBySignedRecurrentVoucherId(signedRecurrentVoucherId: number, page: number, size: number): 
        Promise<Billing[]> {        
        let params:any = {signedRecurrencesId:signedRecurrentVoucherId,page:page|0, size:size|15};
        console.log(params);
        const response = await this.http.get(Endpoints.BILLING_BY_SIGNED_RECURRENCE, params);
        if (response.ok) {
            const capsule  = await response.json() as Capsule;
            console.log(capsule);
            if(capsule.code == "00000"){
                console.log(capsule.data["_embedded"]["billing_recurrences"]);
                const billings = capsule.data["_embedded"]["billing_recurrences"] as Billing[];
                console.log(billings);
                return billings;
            }else{
                throw Error(capsule.message);
            }
        } else {
            throw Error(response.statusText);
        }
    }

















    
    public async getById(id: number): Promise<Transference> {
        console.log(id)
        const response = await this.http.getById(Endpoints.BILLING, id);
        if (response.ok) {
            const capsule = await response.json() as Capsule;
            console.log(capsule);
            if(capsule.code == "00000"){
                const transference = capsule.data as Transference;
                console.log(transference);
                //transference.expiredAt = transference.expiredAt?new Date(transference.expiredAt).getDate():null;
                return transference;
            }else{
                throw Error(capsule.message);
            }
        } else {
            throw Error(response.statusText);
        }
    }

}