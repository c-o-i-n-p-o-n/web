import { Endpoints } from "../core/constants/endpoints";
import { HttpClient } from "../core/http-client-adapter";
import Capsule from "../models/Capsule";
import Currency from "../models/Currency";
import Match from "../models/Match";
import {MatchCreation} from "../models/MatchCreation";
import Transference from "../models/Transference";
import { TransferenceCreation } from "../models/TransferenceCreation";

export class TransferenceDataSource {

    private http: HttpClient = new HttpClient();


    public getURLRescue(hash: string) {
        //console.log(hash)
        return this.http.getFullUrl(Endpoints.TRANSFERENCE_RECEIVE,{hash:hash});
    }

    public async pay(hash: string): Promise<boolean> {
        const params = {
            hash: hash
        };
        console.log(params);
        const response = await this.http.post(Endpoints.TRANSFERENCES_PAY, params);
        console.log(response);
        if (response.ok) {
            const capsule = await response.json() as Capsule;
            console.log(capsule);
            if(capsule.code == "00000"){
                return capsule.data as boolean;
            }else{
                throw Error(capsule.message);
            }
        } else {
            throw Error(response.statusText);
        }
    }

    public async genereteReceive(currency: Currency, amount: number): Promise<Transference> {
        const transference = {
            amount: amount,
            currenciesId: currency.id
        } as TransferenceCreation;
        console.log(transference);
        const response = await this.http.post(Endpoints.TRANSFERENCES_CREATE_RECEIVE, transference);
        console.log(response);
        if (response.ok) {
            const capsule = await response.json() as Capsule;
            console.log(capsule);
            if(capsule.code == "00000"){
                return capsule.data as Transference;
            }else{
                throw Error(capsule.message);
            }
        } else {
            throw Error(response.statusText);
        }
    }
    
    public async check(hash: string): Promise<boolean> {
        let params:any = {hash:hash};
        console.log(params);
        const response = await this.http.get(Endpoints.TRANSFERENCES_CHECK, params);
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

    
    public async getTransferenceByHash(hash: string): Promise<Transference> {
        let params:any = {hash:hash};
        //console.log(params);
        const response = await this.http.get(Endpoints.TRANSFERENCES_BY_HASH, params);
        if (response.ok) {
            const capsule  = await response.json() as Capsule;
            //console.log(capsule);
            if(capsule.code == "00000"){
                const transference = capsule.data as Transference;
                return transference;
            }else{
                throw Error(capsule.message);
            }
        } else {
            throw Error(response.statusText);
        }
    }
    
    public async getById(id: number): Promise<Transference> {
        console.log(id)
        const response = await this.http.getById(Endpoints.TRANSFERENCES, id);
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