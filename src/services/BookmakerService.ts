import Bookmaker from "../models/Bookmaker";
//import { BookamkersDataSource } from "../data/bookmakers.data-source";
import { AuthDataSource } from "../data/auth.data-souce";

export class BookmakerService {

    //private bookamkersDataSource: BookamkersDataSource = new BookamkersDataSource();
    private authDataSource: AuthDataSource = new AuthDataSource();

    public async getBookmakerById(id: number | undefined): Promise<Bookmaker> {
        // return new Promise(resolve => setTimeout(() => {
        //     resolve([{ id: 1, description: "Descrição de um bookmaker", name: "João da Silva" } as Bookmaker]);
        // }, 3000));
        
        console.log(id)
        return await this.authDataSource.getBookmakersById(id);
    }

}