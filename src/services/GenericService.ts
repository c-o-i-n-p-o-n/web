import { GenericDataSource } from "../data/generic.data-source";
import Bookmaker from "../models/Bookmaker";
import Currency from "../models/Currency";
import { Generic } from "../models/Generic";

export class GenericService  {

    private genericDataSource: GenericDataSource = new GenericDataSource();


    public async getGenericByPageAndSize(page: number, size: number, query?:String): Promise<Generic[]>{
        //return new Promise(resolve => setTimeout(() => {
        //    resolve([{ id: 1, description: "description" } as Generic]);
        //}, 3000));
        return this.genericDataSource.getGenericByPageAndSize(page,size,query);
    }

    public async getGenericBookmakerPageAndSize(page: number, size: number, bookmaker?: Bookmaker): Promise<Generic[]>{
        
        if(!!bookmaker &&!!(bookmaker.id)){
            return this.genericDataSource.getGenericBookmakerPageAndSize(bookmaker.id,page,size,undefined);
        }else{
            throw Error("Perfil inválido");
        }
    }
    
    public async getGenericByCurrencyPageAndSize(page: number, size: number, currency?:Currency): Promise<Generic[]>{
        //return new Promise(resolve => setTimeout(() => {
        //    resolve([{ id: 1, description: "description" } as Generic]);
        //}, 3000));
        if(!!currency &&!!(currency.id)){
            return this.genericDataSource.getGenericByCurrencyPageAndSize(currency.id,page,size,undefined);
        }else{
            throw Error("Cupom inválido");
        }
    }

    public async getGenericByEventPageAndSize(eventId:number, page: number, size: number, query?:String): Promise<Generic[]>{
        //return new Promise(resolve => setTimeout(() => {
        //    resolve([{ id: 1, description: "description" } as Generic]);
        //}, 3000));
        return this.genericDataSource.getGenericByEventPageAndSize(eventId,page,size,query);
    }

}
