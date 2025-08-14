import { User } from "./User";

export default interface Category {
    id?: number;
    hid: string;
    description?: string;
    photo?: string;
    createdAt?: Date;
    status?: number;
    score?: number;
  
    beginningAt?: Date;
    duration?: number;
    user?: User
}