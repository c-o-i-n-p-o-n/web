import { CategoriesDataSource } from "../data/categories.data-source";
import Category from "../models/Category";

export class CategoryService {
    
    private categoriesDataSource: CategoriesDataSource = new CategoriesDataSource();

    public async getCategories(query?:String): Promise<Category[]> {
        return this.categoriesDataSource.getCategoryByQuery(query);
    }
}