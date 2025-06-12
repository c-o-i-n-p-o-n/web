import { Endpoints } from "../core/constants/endpoints";
import { HttpClient } from "../core/http-client-adapter";
import Capsule from "../models/Capsule";
import SignedRecurrentVoucher from "../models/SignedRecurrentVoucher";
import RecurrentVoucherCreation from "../models/RecurrentVoucherCreation";

export class SignedRecurrentVouchersDataSource {

    private http: HttpClient = new HttpClient();

    // public async cancelRecurrentVoucher(hash: string): Promise<number> {
    //     console.log(hash)
    //     let params:any = {hash: hash};
    //     console.log(params);
    //     const response = await this.http.get(Endpoints.RECURRENT_VOUCHERS_CANCEL, params);
        
    //     if (response.ok) {
    //         const recurrentVoucherResponse = await response.json();
    //         console.log(recurrentVoucherResponse);
    //         return recurrentVoucherResponse as number;
    //     } else {
    //         throw Error(response.statusText);
    //     }
    // }

    public async getSignedRecurrentVoucherById(id: number): Promise<SignedRecurrentVoucher> {
        console.log(id)
        const response = await this.http.getById(Endpoints.SIGNED_RECURRENT_VOUCHERS, id);
        if (response.ok) {
            const capsule  = await response.json() as Capsule;
            if(capsule.code == "00000"){
                capsule.data["createdAt"] = capsule.data["createdAt"]?new Date(capsule.data["createdAt"]):null;
                const signedRecurrentVoucher = capsule.data as SignedRecurrentVoucher;                
                return signedRecurrentVoucher;
            }else{
                throw Error(capsule.message);
            }
        } else {
            throw Error(response.statusText);
        }
    }

    // public async updateRecurrentVoucher(voucher: RecurrentVoucherCreation): Promise<RecurrentVoucher> {
    //     const voucherObj = {
    //         id: voucher.id,
    //         hid: voucher.hid,
    //         description: voucher.description,
    //         logo: voucher.logo,
    //         photo: voucher.photo,
    //         expiredAt: voucher.expiredAt,
    //         vouchersType: voucher.recurrencesType,
    //         amountPerDue: voucher.amountPerDue,
    //         period: voucher.period,
    //         cicles: voucher.cicles
    //     };
    //     console.log(voucher);
    //     console.log(voucherObj);
    //     const response = await this.http.put(Endpoints.VOUCHERS, voucherObj);
    //     console.log(response);
    //     if (response.ok) {
    //         const voucherResponse = await response.json();
    //         voucherResponse["createdAt"] = voucherResponse["createdAt"]?new Date(voucherResponse["createdAt"]):null;            
    //         return voucherResponse as RecurrentVoucher;
    //     } else {
    //         throw Error(response.statusText);
    //     }
    // }

    public async getSignedRecurrentVouchersByRecurrentId(recurrentVoucherId: number, page: number, size: number): Promise<SignedRecurrentVoucher[]> {        
        let params:any = {signedRecurrencesId:recurrentVoucherId,page:page|0, size:size|15};
        console.log(params);
        const response = await this.http.get(Endpoints.SIGNED_RECURRENT_VOUCHERS, params);
        if (response.ok) {
            const capsule  = await response.json() as Capsule;
            console.log(capsule);
            if(capsule.code == "00000"){
                console.log(capsule.data["_embedded"]["signedRecurrences"]);
                const signedRecurrences = capsule.data["_embedded"]["signedRecurrences"] as SignedRecurrentVoucher[];
                console.log(signedRecurrences);
                return signedRecurrences;
            }else{
                throw Error(capsule.message);
            }
        } else {
            throw Error(response.statusText);
        }
    }


    public async getSignedRecurrentVouchersByConsumerId(bookmakerId: number, page: number, size: number): Promise<SignedRecurrentVoucher[]> {        
        let params:any = {bookmakersId:bookmakerId,page:page|0, size:size|15};
        console.log(params);
        const response = await this.http.get(Endpoints.MY_SIGNED_RECURRENT_VOUCHERS, params);
        if (response.ok) {
            const capsule  = await response.json() as Capsule;
            console.log(capsule);
            if(capsule.code == "00000"){
                console.log(capsule.data["_embedded"]["signedRecurrences"]);
                const signedRecurrences = capsule.data["_embedded"]["signedRecurrences"] as SignedRecurrentVoucher[];
                console.log(signedRecurrences);
                return signedRecurrences;
            }else{
                throw Error(capsule.message);
            }
        } else {
            throw Error(response.statusText);
        }
    }
    

}