import { GenericDataSource } from "../data/generic.data-source";
import { Generic } from "../models/Generic";

export class GenericService  {

    private genericDataSource: GenericDataSource = new GenericDataSource();


    public async getGenericByPageAndSize(page: number, size: number, query?:String): Promise<Generic[]>{
        //return new Promise(resolve => setTimeout(() => {
        //    resolve([{ id: 1, description: "description" } as Generic]);
        //}, 3000));
        return this.genericDataSource.getGenericByPageAndSize(page,size,query);
    }

    public async getGenericByEventPageAndSize(eventId:number, page: number, size: number, query?:String): Promise<Generic[]>{
        //return new Promise(resolve => setTimeout(() => {
        //    resolve([{ id: 1, description: "description" } as Generic]);
        //}, 3000));
        return this.genericDataSource.getGenericByEventPageAndSize(eventId,page,size,query);
    }

}
