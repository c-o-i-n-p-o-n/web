import { Endpoints } from "../core/constants/endpoints";
import { HttpClient } from "../core/http-client-adapter";
import Match from "../models/Match";
import {MatchCreation} from "../models/MatchCreation";

export class MatchDataSource {

    private http: HttpClient = new HttpClient();

    public async getMatchById(id: number): Promise<Match> {
        console.log(id)
        const response = await this.http.getById(Endpoints.MATCHES, id);
        if (response.ok) {
            const matchResponse = await response.json();
            console.log(matchResponse);
            //matchResponse["expiredAt"] = matchResponse["expiredAt"]?new Date(matchResponse["expiredAt"]).getDate():null;
            matchResponse["createdAt"] = matchResponse["createdAt"]?new Date(matchResponse["createdAt"]).getDate():null;
            console.log(matchResponse);
            return matchResponse as Match;
        } else {
            throw Error(response.statusText);
        }
    }

    public async updateMatch(match: MatchCreation): Promise<Match> {
        const matchObj = {
            id: match.id,
            hid: match.hid,
            description: match.description,
            visibility: match.visibility,
            //expiredAt: match.expiredAt,
            logo: match.logo,
            photo: match.photo
        };
        console.log(match);
        console.log(matchObj);
        const response = await this.http.put(Endpoints.MATCHES, matchObj);
        console.log(response);
        if (response.ok) {
            const matchResponse = await response.json();
            return matchResponse as Match;
        } else {
            throw Error(response.statusText);
        }
    }

    public async createMatch(match: MatchCreation): Promise<Match> {
        const matchObj = {
            hid: match.hid,
            description: match.description,
            visibility: match.visibility,
            expiredAt: match.expiredAt,
            eventsId: match.event?.id,
            currenciesId: match.currency?.id,
            maxAmmount: match.maxAmmount
        };
        console.log(match);
        console.log(matchObj);
        const response = await this.http.post(Endpoints.MATCHES, matchObj);
        console.log(response);
        if (response.ok) {
            const matchResponse = await response.json();
            return matchResponse as Match;
        } else {
            throw Error(response.statusText);
        }
    }

}