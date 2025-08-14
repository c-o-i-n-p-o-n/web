import { Endpoints } from "../core/constants/endpoints";
import { HttpClient } from "../core/http-client-adapter";
import Bet from "../models/Bet";

export class BetsDataSource {

    private http: HttpClient = new HttpClient();

    public async getBets(page: number, size: number, stat?:string): Promise<Bet[]> {
        let params:any = {page:page, size:size};
        if(!!stat){
            params = {status: stat,...params};
        }
        console.log(params);
        const response = await this.http.get(Endpoints.BETS, params);
        if (response.ok) {
            const betsResponse = await response.json();
            console.log(betsResponse);
            if(!!betsResponse["_embedded"] && !!betsResponse["_embedded"]["bets"]){
                console.log(betsResponse["_embedded"]["bets"]);
                return betsResponse["_embedded"]["bets"] as Bet[];
            }else{
                return [];
            }
        } else {
            throw Error(response.statusText);
        }
    }

}