
import useSecurityStore from "../stores/SecurityStore";

export class HttpClient {

    private _baseUrl = process.env.NEXT_PUBLIC_API_URL;

    async get(endpoint: string, params?: any, options?: any): Promise<Response> {
        let url = `${this._baseUrl}/${endpoint}`;
        if (params) {
            for (const property in params) {
                url = `${url}/${params[property]}`;
            }
            console.log(url);
        }

        return fetch(url, {
            method: "GET",
            headers: this._buildHeaders(options)
        });
    }

    async getById(endpoint: string, id?: number, options?: any): Promise<Response> {
        let url = `${this._baseUrl}/${endpoint}`;
        console.log(id)
        if (id) {
            url = `${url}/${id}`;
        }
        return fetch(url, {
            method: "GET",
            headers: this._buildHeaders(options)
        });
    }

    async put(endpoint: string, body: any, options?: any): Promise<Response> {

        const headers = this._buildHeaders(options)

        const requestBody = options && options["Content-Type"] != "application/json" ? new URLSearchParams(body) : JSON.stringify(body);

        console.log(`${this._baseUrl}/${endpoint}`);
        console.log(headers);
        console.log(requestBody);

        return fetch(`${this._baseUrl}/${endpoint}`, {
            method: "PUT",
            body: requestBody,
            headers: headers
        });
    }

    async post(endpoint: string, body: any, options?: any): Promise<Response> {

        const headers = this._buildHeaders(options)

        const requestBody = options && options["Content-Type"] != "application/json" ? new URLSearchParams(body) : JSON.stringify(body);

        console.log(`${this._baseUrl}/${endpoint}`);
        console.log(headers);
        console.log(requestBody);

        return fetch(`${this._baseUrl}/${endpoint}`, {
            method: "POST",
            body: requestBody,
            headers: headers
        });
    }

    async login(endpoint: string, body: any, options?: any): Promise<Response> {

        const requestBody = options && options["Content-Type"] != "application/json" ? new URLSearchParams(body) : JSON.stringify(body);

        return fetch(`${this._baseUrl}${endpoint}`, {
            method: "POST",
            body: requestBody,
            headers: {
                ...options,
                "Accept": "application/json",
                "Content-Type": options && options["Content-Type"] ? options["Content-Type"] : "application/json"
            }
        });
    }

    async update(endpoint: string, body: any, id?: number, options?: any): Promise<Response> {
        let url = `${this._baseUrl}/${endpoint}`;
        if (id) {
            url = `${url}/${id}`;
        }
        return fetch(url, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: this._buildHeaders(options)
        });
    }

    private _buildHeaders(options?: any) {

        this._refreshToken();

        const authStorageString = window.localStorage.getItem("auth_store");
        const token = !!authStorageString ? JSON.parse(authStorageString).state.token : null;

        return {
            ...options,
            ...token ? { "Authorization": `bearer ${token}` } : {},
            "Accept": "application/json",
            "Content-Type": options && options["Content-Type"] ? options["Content-Type"] : "application/json"
        };
    }

    async _refreshToken() {
        const authStorageString = window.localStorage.getItem("auth_store");
        
        console.log(authStorageString);
        console.log(!!authStorageString ? JSON.parse(authStorageString).state:null);

        const refreshToken = !!authStorageString ? JSON.parse(authStorageString).state.refreshToken : null;
        
        console.log(refreshToken)
        if(!!refreshToken){
            const expiresIn = !!authStorageString ? JSON.parse(authStorageString).state.expiresIn : null;
            if(!expiresIn || expiresIn < Date.now()){
                const basicToken = process.env.NEXT_PUBLIC_BASIC_API_TOKEN;
                const options = { "Authorization": `Basic ${basicToken}`, "Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded" }
                const encodedToken = { ...refreshToken, "grant_type": "refresh_token" };
                const response = await this._refreshPost("/oauth/token", encodedToken, options);
    
                if (response.ok) {
                    const body = await response.json();
                    const authToken = body["access_token"];
                    const refreshToken = body["refresh_token"];
                    const expiresIn = Date.now() + (body["expires_in"] * 1000);
                    console.log(body["users_id"]);
                    const authStorageString = window.localStorage.getItem("auth_store");
                    const authStorageStringState = !!authStorageString ? JSON.parse(authStorageString).state : null;
                    authStorageStringState['token'] = authToken;
                    authStorageStringState['refreshToken'] = refreshToken;
                    authStorageStringState['expiresIn'] = expiresIn;
                    window.localStorage.setItem("auth_store", JSON.stringify(authStorageStringState));
                }else{
                    //se a requisicao estah falhando tente o login anonimo
                    await this._anonymousToken();
                }
            }
            
        }else{
            //se nao tem refresh token eh pq nao esta autenticado
            //nesse caso deve-se tentar a autenticacao sem login
            await this._anonymousToken();
        }
    }

    
    async _anonymousToken() {
        const authStorageString = window.localStorage.getItem("auth_store");

        let securityStore = !!authStorageString?JSON.parse(authStorageString).state:null;
        if(!securityStore){
            securityStore = useSecurityStore.getState();
        }
        
        const token = securityStore.token;
        const expiresIn = securityStore.expiresIn;

        if(!token || !expiresIn || expiresIn < Date.now()){
            const basicToken = process.env.NEXT_PUBLIC_ANONIMOUS_API_TOKEN;
            const options = { "Authorization": `Basic ${basicToken}`, "Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded" }
            const encodedToken = { "grant_type": "client_credentials" };
            const response = await this._refreshPost("/oauth/token", encodedToken, options);
            
            if (response.ok) {
                const body = await response.json();
                const authToken = body["access_token"];
                const expiresIn = Date.now() + (body["expires_in"] * 1000);
                console.log(body);
                //const authStorageString = window.localStorage.getItem("auth_store");
                //const authStorageStringState = !!authStorageString ? JSON.parse(authStorageString).state : null;
                securityStore['token'] = authToken;
                securityStore['expiresIn'] = expiresIn;
                //window.localStorage.setItem("auth_store", JSON.stringify(securityStore));

                useSecurityStore.setState(() => ({ token: authToken || "", userId: undefined, logged: false, refreshToken: undefined, expiresIn: expiresIn }));
            } else {
                useSecurityStore.setState(() => ({ token: undefined, userId: undefined, logged: false, refreshToken: undefined, expiresIn: undefined }));
            }
        }
        
    }

    

    async _refreshPost(endpoint: string, body: any, options?: any): Promise<Response> {

        const authStorageString = window.localStorage.getItem("auth_store");
        const token = !!authStorageString ? JSON.parse(authStorageString).state.token : null;

        const headers = {
            ...options,
        };


        const requestBody = options && options["Content-Type"] != "application/json" ? new URLSearchParams(body) : JSON.stringify(body);

        console.log(requestBody);
        console.log(headers);
        console.log(`${this._baseUrl}${endpoint}`);

        return fetch(`${this._baseUrl}${endpoint}`, {
            method: "POST",
            body: requestBody,
            headers: headers
        });
    }


}

