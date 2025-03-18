import { Endpoints } from "../core/constants/endpoints";
import { HttpClient } from "../core/http-client-adapter";
import Bookmaker from "../models/Bookmaker";
import { Credentials } from "../models/Credentials";
import { User } from "../models/User";

export class AuthDataSource {

    private http: HttpClient = new HttpClient();

    public async getUserWithToken(jwtToken: string): Promise<User> {
        const headers = new Headers();
        const token = `bearer ${jwtToken || ""}`;
        console.log(token);
        headers.set("Authorization", token);
        const response = await this.http.getById(Endpoints.USERS, undefined, { headers: headers });
        if (response.ok) {
            const userResponse = await response.json();
            return userResponse as User;
        } else {
            throw Error("");
        }
    }

    public async getUserById(id?: number): Promise<User> {
        if(id == null){
            throw Error("User id is null.");
        }
        const response = await this.http.getById(Endpoints.USERS, id);
        //console.log(response);
        if (response.ok) {
            const userResponse = await response.json();
            return userResponse as User;
        } else {
            throw Error("Fail to fecth user data.");
        }
    }

    public async getBookmakersById(id?: number): Promise<Bookmaker> {
        if(id == null){
            throw Error("Bookmaker id is null.");
        }
        const response = await this.http.getById(Endpoints.BOOKMAKERS, id);
        //console.log(response);
        if (response.ok) {
            const bookmakerResponse = await response.json();
            return bookmakerResponse as Bookmaker;
        } else {
            throw Error("Fail to fecth bookmaker data.");
        }
    }

    public async login(credentials: Credentials): Promise<Response> {
        const basicToken = process.env.NEXT_PUBLIC_BASIC_API_TOKEN;
        const options = {"Authorization": `Basic ${basicToken}`, "Content-Type": "application/x-www-form-urlencoded"}
        const serverCredentials = { ...credentials, "grant_type": "password"};
        const response = await this.http.login("/oauth/token", serverCredentials, options);
        if (response.ok) {
            return response;
        } else {
            throw Error(response.statusText);
        }
    }

    public async loginWithoutCredencials(): Promise<Response> {
        const basicToken = process.env.NEXT_PUBLIC_ANONIMOUS_API_TOKEN;
        const options = {"Authorization": `Basic ${basicToken}`, "Content-Type": "application/x-www-form-urlencoded"}
        const serverCredentials = { "grant_type": "client_credentials"};
        const response = await this.http.login("/oauth/token", serverCredentials, options);
        if (response.ok) {
            return response;
        } else {
            throw Error(response.statusText);
        }
    }

}