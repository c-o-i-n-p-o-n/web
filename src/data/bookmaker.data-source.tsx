import { Endpoints } from "../core/constants/endpoints";
import { HttpClient } from "../core/http-client-adapter";
import Bookmaker from "../models/Bookmaker";
import BookmakerCreation from "../models/BookmakerCreation";
import Capsule from "../models/Capsule";
import Currency from "../models/Currency";
import Match from "../models/Match";
import {MatchCreation} from "../models/MatchCreation";
import Transference from "../models/Transference";
import { TransferenceCreation } from "../models/TransferenceCreation";

export class BookmakerDataSource {

    private http: HttpClient = new HttpClient();

    public async updateBookmaker(bookmaker: BookmakerCreation) : Promise<Bookmaker> {
        const bookmakerObj = {
            id: bookmaker.id,
            hid: bookmaker.hid,
            description: bookmaker.description,
            logo: bookmaker.logo,
            photo: bookmaker.photo,
            classification: bookmaker.classification
        };
        console.log(bookmaker);
        console.log(bookmakerObj);
        const response = await this.http.put(Endpoints.BOOKMAKERS, bookmakerObj);
        console.log(response);
        if (response.ok) {
            const capsule = await response.json() as Capsule;
            console.log(capsule);
            if(capsule.code == "00000"){
                console.log(capsule.data as Bookmaker);
                capsule.data["createdAt"] = capsule.data["createdAt"]?new Date(capsule.data["createdAt"]):null;            
                return capsule.data as Bookmaker;
            }else{
                throw Error(capsule.message);
            }
        } else {
            throw Error(response.statusText);
        }
    }

}