import { Endpoints } from "../core/constants/endpoints";
import { HttpClient } from "../core/http-client-adapter";
import Category from "../models/Category";

export class CategoriesDataSource {

    private http: HttpClient = new HttpClient();

    public async getCategoryByQuery(query?: String): Promise<Category[]> {
        let params:any = {page:0, size:15};
        if(query){
            params = {query: query,...params};
        }
        const response = await this.http.get(Endpoints.CATEGORIES_FILTER, params);
        if (response.ok) {
            const categoriesResponse = await response.json();
            console.log(categoriesResponse["_embedded"]);
            if(!!categoriesResponse["_embedded"] && !!categoriesResponse["_embedded"]["categories"]){
                console.log(categoriesResponse["_embedded"]["categories"]);
                return categoriesResponse["_embedded"]["categories"] as Category[];
            }else{
                return [];
            }
        } else {
            throw Error(response.statusText);
        }
    }

}