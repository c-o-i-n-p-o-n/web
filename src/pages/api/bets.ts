import {NextApiRequest, NextApiResponse} from "next";
import Bet from "../../models/Bet";
import {mockedBets} from "../../util/mocks/bet-mocks";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Bet[]>
) {
    //res.status(200).json(mockedBets)
}


