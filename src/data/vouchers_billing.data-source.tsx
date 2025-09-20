import { Endpoints } from "../core/constants/endpoints";
import { HttpClient } from "../core/http-client-adapter";
import Capsule from "../models/Capsule";
import Voucher from "../models/Voucher";
import VoucherCreation from "../models/VoucherCreation";

import ServerError, {ServerErrorConstructor} from "../models/ServerError";
import VoucherBilling from "../models/VoucherBilling";
import Transference from "../models/Transference";

export class VouchersBillingDataSource {

    private http: HttpClient = new HttpClient();

    public async validVoucherBilling(id: number):Promise<string> {
        const params = {
            vouchersBillingId: id
        };
        console.log(params);
        const response = await this.http.get(Endpoints.VOUCHERS_BILLING_VALID, params);
        console.log(response);
        if (response.ok) {
            const capsule = await response.json() as Capsule;
            console.log(capsule);
            if(capsule.code == "00000"){
                return capsule.message;
            }else{
                throw Error(capsule.message);
            }
        } else {
            throw Error(response.statusText);
        }
    }

    public async getVoucherBillingsByVoucherIdAndQueryAndPageAndSize(id:number, page: number, size: number, query?: String): Promise<VoucherBilling[]> {
        let params:any = {vouchersBillingId: id, page: page, size: size};
        if(query){
            params = {query: query,...params};
        }

        console.log(params);
        const response = await this.http.get(Endpoints.VOUCHERS_BILLING_FILTER, params);
        console.log(response);
        if (response.ok) {
            const capsule  = await response.json() as Capsule;
            console.log(capsule);
            if(capsule.code == "00000" && !!capsule.data["_embedded"]){
                console.log(capsule.data["_embedded"]["vouchers_billing"]);
                const voucherBillingS = capsule.data["_embedded"]["vouchers_billing"] as VoucherBilling[];
                console.log(voucherBillingS);
                return voucherBillingS;
            }else{
                throw Error(capsule.message);
            }

        } else {
            throw Error(response.statusText);
        }
    }

    public async getVoucherBillingById(vouchersBillingId: number): Promise<VoucherBilling> {
        console.log(vouchersBillingId)
        const response = await this.http.getById(Endpoints.VOUCHERS_BILLING, vouchersBillingId);
        if (response.ok) {
            const capsule = await response.json() as Capsule;
            console.log(capsule);
            if(capsule.code == "00000"){
                const voucherBilling = capsule.data as VoucherBilling;
                console.log(voucherBilling);
                return voucherBilling;
            }else{
                throw Error(capsule.message);
            }
        } else {
            throw Error(response.statusText);
        }
    }

    
    public async check(vouchersBillingId: number): Promise<boolean> {
        console.log(vouchersBillingId)
        let params:any = {vouchersBillingId: vouchersBillingId};
        console.log(params);
        const response = await this.http.get(Endpoints.VOUCHERS_BILLING_CHECK, params);
        if (response.ok) {
            const capsule = await response.json() as Capsule;
            console.log(capsule);
            if(capsule.code == "00000"){
                return Number(capsule.message as string) != 0;
            }else{
                throw Error(capsule.message);
            }
        } else {
            throw Error(response.statusText);
        }
    }

}