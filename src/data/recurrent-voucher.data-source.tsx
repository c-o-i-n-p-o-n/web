import { Endpoints } from "../core/constants/endpoints";
import { HttpClient } from "../core/http-client-adapter";
import Capsule from "../models/Capsule";
import RecurrentVoucher from "../models/RecurrentVoucher";
import RecurrentVoucherCreation from "../models/RecurrentVoucherCreation";

export class RecurrentVouchersDataSource {

    private http: HttpClient = new HttpClient();
    
    public async getTotalAmountPerDueById(id: number): Promise<number> {
        console.log(id)
        let params:any = {recurrencesId: id};
        console.log(params);
        const response = await this.http.get(Endpoints.RECURRENT_VOUCHERS_TOTAL_AMOUNT_PER_DUE, params);
        
        if (response.ok) {
            const capsule  = await response.json() as Capsule;
            if(capsule.code == "00000"){
                console.log(capsule.message);
                return Number(capsule.message);
            }else{
                throw Error(capsule.message);
            }
        } else {
            throw Error(response.statusText);
        }
    }

    public async cancelRecurrentVoucher(hash: string): Promise<number> {
        console.log(hash)
        let params:any = {hash: hash};
        console.log(params);
        const response = await this.http.get(Endpoints.RECURRENT_VOUCHERS_CANCEL, params);
        
        if (response.ok) {
            const capsule  = await response.json() as Capsule;
            if(capsule.code == "00000"){
                console.log(capsule.message);
                return Number(capsule.message);
            }else{
                throw Error(capsule.message);
            }
        } else {
            throw Error(response.statusText);
        }
    }

    public async hireRecurrentVoucher(hash: string): Promise<boolean> {
        console.log(hash)
        let params:any = {hash: hash};
        console.log(params);
        const response = await this.http.get(Endpoints.RECURRENT_VOUCHERS_HIRE, params);        
        if (response.ok) {
            const capsule  = await response.json() as Capsule;
            if(capsule.code == "00000"){
                return true;
            }else{
                throw Error(capsule.message);
            }
        } else {
            throw Error(response.statusText);
        }
    }

    public async getRecurrentVoucherById(id: number): Promise<RecurrentVoucher> {
        console.log(id)
        const response = await this.http.getById(Endpoints.RECURRENT_VOUCHERS, id);
        // if (response.ok) {
        //     const recurrentVouchersResponse = await response.json();
        //     console.log(recurrentVouchersResponse);
        //     recurrentVouchersResponse["createdAt"] = recurrentVouchersResponse["createdAt"]?new Date(recurrentVouchersResponse["createdAt"]):null;
        //     console.log(recurrentVouchersResponse);
        //     return recurrentVouchersResponse as RecurrentVoucher;
        // } else {
        //     throw Error(response.statusText);
        // }
        if (response.ok) {
            const capsule  = await response.json() as Capsule;
            if(capsule.code == "00000"){
                capsule.data["createdAt"] = capsule.data["createdAt"]?new Date(capsule.data["createdAt"]):null;
                const recurrentVoucher = capsule.data as RecurrentVoucher;                
                return recurrentVoucher;
            }else{
                throw Error(capsule.message);
            }
        } else {
            throw Error(response.statusText);
        }
    }

    public async updateRecurrentVoucher(voucher: RecurrentVoucherCreation): Promise<RecurrentVoucher> {
        const voucherObj = {
            id: voucher.id,
            hid: voucher.hid,
            description: voucher.description,
            logo: voucher.logo,
            photo: voucher.photo,
            expiredAt: voucher.expiredAt,
            vouchersType: voucher.recurrencesType,
            amountPerDue: voucher.amountPerDue,
            period: voucher.period,
            cicles: voucher.cicles
        };
        console.log(voucher);
        console.log(voucherObj);
        const response = await this.http.put(Endpoints.VOUCHERS, voucherObj);
        console.log(response);
        if (response.ok) {
            const voucherResponse = await response.json();
            voucherResponse["createdAt"] = voucherResponse["createdAt"]?new Date(voucherResponse["createdAt"]):null;            
            return voucherResponse as RecurrentVoucher;
        } else {
            throw Error(response.statusText);
        }
    }

    public async getRecurrentVouchersByQuery(page: number, size: number, query?: String): Promise<RecurrentVoucher[]> {        
        let params:any = {page:page|0, size:size|15};
        if(query){
            params = {query: query,...params};
        }
        console.log(params);
        const response = await this.http.get(Endpoints.RECURRENT_VOUCHERS_FILTER, params);
        if (response.ok) {
            //const recurrentVouchersResponse = await response.json();
            const capsule  = await response.json() as Capsule;
            console.log(capsule);
            if(capsule.code == "00000"){
                console.log(capsule.data["_embedded"]["recurrences"]);
                const recurrences = capsule.data["_embedded"]["recurrences"] as RecurrentVoucher[];
                console.log(recurrences);
                return recurrences;
            }else{
                throw Error(capsule.message);
            }
        } else {
            throw Error(response.statusText);
        }
    }

    public async createRecurrentVoucher(recurrentVoucher: RecurrentVoucherCreation): Promise<RecurrentVoucher> {

        const recurrentVoucherObj = {
            hid: recurrentVoucher.hid,
            description: recurrentVoucher.description,
            logo: recurrentVoucher.logo,
            photo: recurrentVoucher.photo,
            expiredAt: recurrentVoucher.expiredAt,
            recurrencesType: recurrentVoucher.recurrencesType,
            cicles: recurrentVoucher.cicles,
            amountPerDue: recurrentVoucher.amountPerDue,
            period: recurrentVoucher.period,
            timeUnit: recurrentVoucher.timeUnit,
            currenciesId: recurrentVoucher.currency?.id
        };

        console.log(recurrentVoucher);
        console.log(recurrentVoucherObj);
        const response = await this.http.post(Endpoints.RECURRENT_VOUCHERS, recurrentVoucherObj);
        console.log(response);
        if (response.ok) {
            const capsule  = await response.json() as Capsule;
            if(capsule.code == "00000"){
                const recurrentVoucher = capsule.data as RecurrentVoucher;
                return recurrentVoucher;
            }else{
                throw Error(capsule.message);
            }
            //const recurrentVouchersResponse = await response.json();
            //return recurrentVouchersResponse as RecurrentVoucher;
        } else {
            throw Error(response.status + " " + response.statusText);
        }
    }

}