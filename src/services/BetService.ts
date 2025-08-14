import Bet from "../models/Bet";
import { BetsDataSource } from "../data/bets.data-source";

export class BetService {
    
    private betsDataSource: BetsDataSource = new BetsDataSource();

    // public async getBets(): Promise<Bet[]> {
    //     return new Promise(resolve => setTimeout(() => {
    //         resolve([{ id: 1, description: "description", odd: 2 } as Bet]);
    //     }, 3000));
    // }
    
    public async getBets(page: number, size: number, status?:string): Promise<Bet[]> {
        return this.betsDataSource.getBets(page, size, status);
    }

}
