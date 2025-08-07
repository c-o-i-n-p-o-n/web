import {NextApiRequest, NextApiResponse} from "next";
import Bookmaker from "../../models/Bookmaker";
import {mockedBookmakers} from "../../util/mocks/bookmaker-mocks";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Bookmaker[]>
) {
    //res.status(200).json(mockedBookmakers)
}


