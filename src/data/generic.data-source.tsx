import { Endpoints } from "../core/constants/endpoints";
import { HttpClient } from "../core/http-client-adapter";
import { Generic } from "../models/Generic";
import UserCreation from "../models/UserCreation";

export class GenericDataSource {

    private http: HttpClient = new HttpClient();

    public async getGenericByPageAndSize(page: number, size: number, query?: String): Promise<Generic[]> {
        let params:any = {page: page, size: size};
        if(query){
            params = {query: query,...params};
        }
        const response = await this.http.get(Endpoints.GENERIC, params);
        if (response.ok) {
            const genericResponse = await response.json();
            if(!!genericResponse["_embedded"] && !!genericResponse["_embedded"]["genericEntitiesModelList"]){
                console.log(genericResponse["_embedded"]["genericEntitiesModelList"]);
                return genericResponse["_embedded"]["genericEntitiesModelList"] as Generic[];
            }else{
                return [];
            }
        } else {
            throw Error(response.statusText);
        }
    }

    public async getGenericByEventPageAndSize(eventId:number, page: number, size: number, query?: String): Promise<Generic[]> {
        let params:any = {page: page, size: size};
        if(query){
            params = {query: query,...params};
        }
        params = {event: eventId,...params};

        console.log(params);
        const response = await this.http.get(Endpoints.GENERIC_EVENT, params);
        console.log(response);
        if (response.ok) {
            const genericResponse = await response.json();
            console.log(genericResponse);
            if(!!genericResponse["_embedded"] && !!genericResponse["_embedded"]["genericEntitiesModelList"]){
                console.log(genericResponse["_embedded"]["genericEntitiesModelList"]);
                return genericResponse["_embedded"]["genericEntitiesModelList"] as Generic[];
            }else{
                return [];
            }
        } else {
            throw Error(response.statusText);
        }
    }

}