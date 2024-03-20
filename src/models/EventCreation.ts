import Category from "./Category";
import {User} from "./User";

export default interface EventCreation {
    hid: string;
    hid2?: string;
    hid3?: string;
    hid4?: string;
    hid5?: string;
    description?: string;
    photo?: string;
    beginningAt?: Date;
    duration?: number;
    categories?: Category[];
    user?: User
    
}
