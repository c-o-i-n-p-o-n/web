import { Endpoints } from "../core/constants/endpoints";
import { HttpClient } from "../core/http-client-adapter";
import Capsule from "../models/Capsule";
import Voucher from "../models/Voucher";
import VoucherCreation from "../models/VoucherCreation";

import ServerError, {ServerErrorConstructor} from "../models/ServerError";

export class VouchersDataSource {

    private http: HttpClient = new HttpClient();

    public async assignMoreCoin(id: number, amount: number): Promise<number> {
        console.log(id)
        let params:any = {vouchersId: id, amount: amount};
        console.log(params);
        const response = await this.http.get(Endpoints.VOUCHERS_ASSIGN_MORE, params);
        
        if (response.ok) {
            const capsule  = await response.json() as Capsule;
            console.log(capsule);
            if(capsule.code == "00000"){
                console.log(capsule.message);
                const result = capsule.message as string;
                console.log(result);
                return Number(result);
            }else{
                throw Error(capsule.message);
            }
        } else {
            throw Error(response.statusText);
        }
    }

    public async cancelVoucher(hash: string): Promise<number> {
        console.log(hash)
        let params:any = {vouchersHash: hash};
        console.log(params);
        const response = await this.http.get(Endpoints.VOUCHERS_CANCEL, params);
        
        if (response.ok) {
            const capsule  = await response.json() as Capsule;
            console.log(capsule);
            if(capsule.code == "00000"){
                console.log(capsule.data);
                const result = capsule.data as string;
                console.log(result);
                return Number(result);
            }else{
                throw Error(capsule.message);
            }
        } else {
            throw Error(response.statusText);
        }



        //     const voucherResponse = await response.json();
        //     console.log(voucherResponse);
        //     return voucherResponse as number;
        //     //if(!!voucherResponse["_embedded"] && !!voucherResponse["_embedded"]["remain"]){
        //     //    console.log(voucherResponse["_embedded"]["remain"]);
        //     //    return voucherResponse["_embedded"]["remain"] as number;
        //    // }else{
        //     //    return 0;
        //     //}
        // } else {
        //     throw Error(response.statusText);
        // }
    }

    public async checkVoucherTaken(hash: string): Promise<boolean> {
        console.log(hash)
        let params:any = {vouchersHash: hash};
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

    public async takeVoucher(hash: string): Promise<number> {
        console.log(hash)
        let params:any = {hash: hash};
        console.log(params);
        const response = await this.http.get(Endpoints.VOUCHERS_TAKE, params);
        if (response.ok) {

            const capsule  = await response.json() as Capsule;
            console.log(capsule);
            if(capsule.code == "00000"){
                console.log(capsule.data);
                const result = Number(capsule.message) as number;//voucherBillingId
                console.log(result);
                return result;
            }else{
                if(capsule.code == "V0007"){//V0007 Já tem --- //V0003 gratiuto
                    throw new ServerErrorConstructor("Você já usou este vale",capsule.code);
                }
                if(capsule.code == "V0003"){//V0007 Já tem --- //V0003 gratiuto
                    throw new ServerErrorConstructor("Este vale é gratuito",capsule.code);
                }
                if(capsule.code.startsWith("V")){
                    throw new ServerErrorConstructor(capsule.message,capsule.code);
                }
                throw new ServerErrorConstructor("Erro desconhecido, tente mais tarde","99999");
            }


            //const voucherResponse = await response.json();
            //console.log(voucherResponse);
            //return voucherResponse as boolean;




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

    public async requestVoucher(hash: string): Promise<number> {
        console.log(hash)
        let params:any = {hash: hash};
        console.log(params);
        const response = await this.http.get(Endpoints.VOUCHERS_REQUEST, params);
        if (response.ok) {

            const capsule  = await response.json() as Capsule;
            console.log(capsule);
            if(capsule.code == "00000"){
                console.log(capsule.data);
                const result = Number(capsule.message) as number;//voucherBillingId
                console.log(result);
                return result;
            }else{
                if(capsule.code == "V0007"){//V0007 Já tem --- //V0003 gratiuto
                    throw new ServerErrorConstructor("Você já usou este vale",capsule.code);
                }
                if(capsule.code == "V0003"){//V0007 Já tem --- //V0003 gratiuto
                    throw new ServerErrorConstructor("Ester vale é gratuito",capsule.code);
                }
                throw new ServerErrorConstructor("Erro desconhecido, tente mais tarde","99999");
            }


            //const voucherResponse = await response.json();
            //console.log(voucherResponse);
            //return voucherResponse as boolean;




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

    public async getTotalAmountAvailableById(id: number): Promise<number> {
        console.log(id)
        const response = await this.http.getById(Endpoints.VOUCHERS_TOTAL_AMOUNT_available, id);
        if (response.ok) {
            const capsule  = await response.json() as Capsule;
            console.log(capsule);
            if(capsule.code == "00000"){
                console.log(capsule.message);
                const amount = capsule.message as string;
                console.log(amount);
                return Number(amount);
            }else{
                throw Error(capsule.message);
            }
        } else {
            throw Error(response.statusText);
        }
    }

    public async getTotalAmountById(id: number): Promise<number> {
        console.log(id)
        const response = await this.http.getById(Endpoints.VOUCHERS_TOTAL_AMOUNT, id);
        if (response.ok) {
            const capsule  = await response.json() as Capsule;
            console.log(capsule);
            if(capsule.code == "00000"){
                console.log(capsule.message);
                const amount = capsule.message as string;
                console.log(amount);
                return Number(amount);
            }else{
                throw Error(capsule.message);
            }
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

    public async getMyVouchers(page: number, size: number): Promise<Voucher[]> {
        let params:any = {page:page|0, size:size|15};
        console.log(params);
        const response = await this.http.get(Endpoints.VOUCHERS_MY, params);
        if (response.ok) {
            //const vouchersResponse = await response.json();
            const capsule  = await response.json() as Capsule;
            console.log(capsule);
            //console.log(vouchersResponse);
            if(capsule.code == "00000"){
                console.log(capsule.data["_embedded"]["vouchers"]);
                const vouchers = capsule.data["_embedded"]["vouchers"] as Voucher[];
                console.log(vouchers);
                return vouchers;
            }else{
                throw Error(capsule.message);
            }
            // if(!!vouchersResponse["_embedded"] && !!vouchersResponse["_embedded"]["vouchers"]){
            //     console.log(vouchersResponse["_embedded"]["vouchers"]);
            //     return vouchersResponse["_embedded"]["vouchers"] as Voucher[];
            // }else{
            //     return [];
            // }
        } else {
            throw Error(response.statusText);
        }
    }

    public async getVouchers(page: number, size: number,query?: String): Promise<Voucher[]> {
        let params:any = {page:page|0, size:size|15};
        if(query){
            params = {query: query,...params};
        }
        console.log(params);
        const response = await this.http.get(Endpoints.VOUCHERS_FILTER, params);
        if (response.ok) {
            //const vouchersResponse = await response.json();
            const capsule  = await response.json() as Capsule;
            console.log(capsule);
            //console.log(vouchersResponse);
            if(capsule.code == "00000"){
                console.log(capsule.data["_embedded"]["vouchers"]);
                const vouchers = capsule.data["_embedded"]["vouchers"] as Voucher[];
                console.log(vouchers);
                return vouchers;
            }else{
                throw Error(capsule.message);
            }
            // if(!!vouchersResponse["_embedded"] && !!vouchersResponse["_embedded"]["vouchers"]){
            //     console.log(vouchersResponse["_embedded"]["vouchers"]);
            //     return vouchersResponse["_embedded"]["vouchers"] as Voucher[];
            // }else{
            //     return [];
            // }
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
            currenciesId: voucher.currency?.id,
            cost: Number(voucher.cost)
        };

        console.log(voucher);
        console.log(voucherObj);
        const response = await this.http.post(Endpoints.VOUCHERS, voucherObj);
        console.log(response);


        if (response.ok) {
            const capsule  = await response.json() as Capsule;
            console.log(capsule);
            if(capsule.code == "00000"){
                const voucher = capsule.data as Voucher;
                console.log(voucher);
                return voucher;
            }else{
                throw Error(capsule.message);
            }
        } else {
            throw Error(response.status + " " + response.statusText);
        }


        // if (response.ok) {
        //     const voucherResponse = await response.json();
        //     return voucherResponse as Voucher;
        // } else {
        //     throw Error(response.statusText);
        // }
    }

}