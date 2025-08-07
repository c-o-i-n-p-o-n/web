import { MatchDataSource } from "../data/match.data-source";
import Match from "../models/Match";
import {MatchCreation,matchToMatchCreation} from "../models/MatchCreation";

export class MatchService {

    private matchDataSource: MatchDataSource = new MatchDataSource();

    public async getMatchById(id?: number): Promise<Match | undefined> {
        console.log(id)
        if(!!id){
            return await this.matchDataSource.getMatchById(id);
        }
        return undefined;
    }

    public async getMatchByOptionId(optionId: number): Promise<Match> {
        console.log(optionId)
        return await this.matchDataSource.getMatchByOptionId(optionId);
    }

    public async createMatch(match: MatchCreation): Promise<Match> {
        return this.matchDataSource.createMatch(match);
    };

    public async updateMatch(match: Match, changes: any): Promise<Match> {
        var matchCreation: MatchCreation = matchToMatchCreation(match);
        matchCreation = {
            ...matchCreation,
            ...changes
        }
        return this.matchDataSource.updateMatch(matchCreation);
    };
    
    public async getMatchs(page: number, size: number): Promise<Match[]> {
        console.log(page)
        return this.matchDataSource.getMatchs(page, size);
    }
}
