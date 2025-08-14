import {NextApiRequest, NextApiResponse} from "next";
import {mockedCategories} from "../../util/mocks/categories-mocks";
import Category from "../../models/Category";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Category[]>
) {
    //res.status(200).json(mockedCategories);
}