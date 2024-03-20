import { Endpoints } from "../core/constants/endpoints";
import { HttpClient } from "../core/http-client-adapter";
import Voucher from "../models/Voucher";
import VoucherCreation from "../models/VoucherCreation";

export class VouchersDataSource {

    private http: HttpClient = new HttpClient();

    public async cancelVoucher(hash: string): Promise<number> {
        console.log(hash)
        let params:any = {hash: hash};
        console.log(params);
        const response = await this.http.get(Endpoints.VOUCHERS_CANCEL, params);
        
        if (response.ok) {
            const voucherResponse = await response.json();
            console.log(voucherResponse);
            return voucherResponse as number;
            //if(!!voucherResponse["_embedded"] && !!voucherResponse["_embedded"]["remain"]){
            //    console.log(voucherResponse["_embedded"]["remain"]);
            //    return voucherResponse["_embedded"]["remain"] as number;
           // }else{
            //    return 0;
            //}
        } else {
            throw Error(response.statusText);
        }
    }

    public async checkVoucherTaken(hash: string): Promise<boolean> {
        console.log(hash)
        let params:any = {hash: hash};
        console.log(params);
        const response = await this.http.get(Endpoints.VOUCHERS_TAKEN, params);
        if (response.ok) {
            const voucherResponse = await response.json();
            console.log(voucherResponse);
            return voucherResponse as boolean;
            //if(!!voucherResponse["_embedded"] && !!voucherResponse["_embedded"]["ack"]){
            //    console.log(voucherResponse["_embedded"]["ack"]);
            //    return voucherResponse["_embedded"]["ack"] as boolean;
            //}else{
            //    return false;
            //}
        } else {
            throw Error(response.statusText);
        }
    }

    public async takeVoucher(hash: string): Promise<boolean> {
        console.log(hash)
        let params:any = {hash: hash};
        console.log(params);
        const response = await this.http.get(Endpoints.VOUCHERS_TAKE, params);
        if (response.ok) {
            const voucherResponse = await response.json();
            console.log(voucherResponse);
            return voucherResponse as boolean;
            //if(!!voucherResponse["_embedded"] && !!voucherResponse["_embedded"]["ack"]){
            //    console.log(voucherResponse["_embedded"]["ack"]);
           //     return voucherResponse["_embedded"]["ack"] as boolean;
            //}else{
            //    return false;
            //}
        } else {
            throw Error(response.statusText);
        }
    }

    public async getVoucherById(id: number): Promise<Voucher> {
        console.log(id)
        const response = await this.http.getById(Endpoints.VOUCHERS, id);
        if (response.ok) {
            const vouchersResponse = await response.json();
            console.log(vouchersResponse);
            vouchersResponse["createdAt"] = vouchersResponse["createdAt"]?new Date(vouchersResponse["createdAt"]):null;
            console.log(vouchersResponse);
            return vouchersResponse as Voucher;
        } else {
            throw Error(response.statusText);
        }
    }

    public async updateVoucher(voucher: VoucherCreation): Promise<Voucher> {
        const voucherObj = {
            id: voucher.id,
            hid: voucher.hid,
            description: voucher.description,
            logo: voucher.logo,
            photo: voucher.photo,
            expiredAt: voucher.expiredAt,
            vouchersType: voucher.vouchersType,
            amountPerUser: voucher.amountPerUser
        };
        console.log(voucher);
        console.log(voucherObj);
        const response = await this.http.put(Endpoints.VOUCHERS, voucherObj);
        console.log(response);
        if (response.ok) {
            const voucherResponse = await response.json();
            voucherResponse["createdAt"] = voucherResponse["createdAt"]?new Date(voucherResponse["createdAt"]):null;            
            return voucherResponse as Voucher;
        } else {
            throw Error(response.statusText);
        }
    }

    public async getVouchersByQuery(query?: String): Promise<Voucher[]> {
        let params:any = {page:0, size:15};
        if(query){
            params = {query: query,...params};
        }
        console.log(params);
        const response = await this.http.get(Endpoints.VOUCHERS_FILTER, params);
        if (response.ok) {
            const vouchersResponse = await response.json();
            console.log(vouchersResponse);
            if(!!vouchersResponse["_embedded"] && !!vouchersResponse["_embedded"]["vouchers"]){
                console.log(vouchersResponse["_embedded"]["vouchers"]);
                return vouchersResponse["_embedded"]["vouchers"] as Voucher[];
            }else{
                return [];
            }
        } else {
            throw Error(response.statusText);
        }
    }

    public async createVoucher(voucher: VoucherCreation): Promise<Voucher> {

        const voucherObj = {
            hid: voucher.hid,
            description: voucher.description,
            logo: voucher.logo,
            photo: voucher.photo,
            expiredAt: voucher.expiredAt,
            vouchersType: voucher.vouchersType,
            amount: voucher.amount,
            amountPerUser: voucher.amountPerUser,
            currenciesId: voucher.currency?.id
        };

        console.log(voucher);
        console.log(voucherObj);
        const response = await this.http.post(Endpoints.VOUCHERS, voucherObj);
        console.log(response);
        if (response.ok) {
            const voucherResponse = await response.json();
            return voucherResponse as Voucher;
        } else {
            throw Error(response.statusText);
        }
    }

}