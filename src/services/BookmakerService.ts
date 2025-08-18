import Bookmaker from "../models/Bookmaker";
//import { BookamkersDataSource } from "../data/bookmakers.data-source";
import { AuthDataSource } from "../data/auth.data-souce";
import { BookmakerDataSource } from "../data/bookmaker.data-source";
import BookmakerCreation, { bookmakerToBookmakerCreation } from "../models/BookmakerCreation";

export class BookmakerService {

    private bookamkersDataSource: BookmakerDataSource = new BookmakerDataSource();
    private authDataSource: AuthDataSource = new AuthDataSource();
    
    public async updateBookmaker(bookmaker: Bookmaker, changes: any) : Promise<Bookmaker> {
        var bookmakerCreation: BookmakerCreation = bookmakerToBookmakerCreation(bookmaker);
        bookmakerCreation = {
            ...bookmakerCreation,
            ...changes
        }
        return this.bookamkersDataSource.updateBookmaker(bookmakerCreation);
    }

    public async getBookmakerById(id: number | undefined): Promise<Bookmaker> {
        // return new Promise(resolve => setTimeout(() => {
        //     resolve([{ id: 1, description: "Descrição de um bookmaker", name: "João da Silva" } as Bookmaker]);
        // }, 3000));
        
        console.log(id)
        return await this.authDataSource.getBookmakersById(id);
    }

}