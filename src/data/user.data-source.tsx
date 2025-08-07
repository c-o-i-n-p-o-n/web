import {format} from "date-fns";
import { Endpoints } from "../core/constants/endpoints";
import { HttpClient } from "../core/http-client-adapter";
import { User } from "../models/User";
import UserCreation from "../models/UserCreation";

export class UserDataSource {

    private http: HttpClient = new HttpClient();

    public async createUser(user: UserCreation): Promise<User> {
        console.log(user);
        console.log(format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'"));
        const userObj = {
            cryptedPass: user.password,
            userName: `${user.firstName} ${user.lastName}`,
            userEmail: user.email,
            description: "",
            govNumber: user.cpf,
            birthday: format(user.birthDate, "yyyy-MM-dd'T'HH:mm:ss'Z'"),//T00:00:00Z
            photo: ""
        };
        console.log(userObj);
        const response = await this.http.post(Endpoints.USERS, userObj)
        console.log(response);
        if (response.ok) {
            const userResponse = await response.json();
            return userResponse as User;
        } else {
            throw Error(response.statusText);
        }
    }

    public async getUser(): Promise<User> {
        const response = await this.http.getById(Endpoints.USERS);
        if (response.ok) {
            const userResponse = await response.json();
            return userResponse as User;
        } else {
            throw Error(response.statusText);
        }
    }

    public async getUserById(id: number): Promise<User> {
        const response = await this.http.getById(Endpoints.USERS, id);
        if (response.ok) {
            const userResponse = await response.json();
            return userResponse as User;
        } else {
            throw Error(response.statusText);
        }
    }

    public async updateUser(user: UserCreation): Promise<User> {
        const userObj = {
            cryptedPass: user.password,
            userName: `${user.firstName} ${user.lastName}`,
            userEmail: user.email,
            description: "",
            govNumber: user.cpf,
            birthday: user.birthDate,
            photo: ""
        };
        const response = await this.http.update(Endpoints.USERS, userObj)
        if (response.ok) {
            const userResponse = await response.json();
            return userResponse as User;
        } else {
            throw Error(response.statusText);
        }
    }

    public async updatePassword(passwords: { actualCryptedPass: string; newCryptedPass: string; }, userId: number): Promise<void> {
        const response = await this.http.update(Endpoints.USERS, passwords, userId);
        if (response.ok) {
            return;
        } else {
            throw Error(response.statusText);
        }
    }

}