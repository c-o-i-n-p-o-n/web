import { AuthDataSource } from "../data/auth.data-souce";
import { Credentials } from "../models/Credentials";
import { User } from "../models/User";
import Bookmaker from "../models/Bookmaker";
import useSecurityStore from "../stores/SecurityStore";
import jwt_decode from 'jwt-decode';


interface IAuthService {
  login: (credentials: Credentials) => Promise<Response>;
  signOut: () => void;
  getUser: () => Promise<User | null>;
}

const dataSource = new AuthDataSource();

export class AuthService implements IAuthService {

  public async getUser(): Promise<User | null> {
    if (useSecurityStore.getState().logged) {
      const token = useSecurityStore.getState().token;
      const decoded = jwt_decode(token || "") as any;
      console.log(decoded["users_id"]);
      return dataSource.getUserById(useSecurityStore.getState().userId);
    }
    return Promise.resolve(null);
  }

  public async getBookmaker(): Promise<Bookmaker | null> {
    if (useSecurityStore.getState().logged) {
      const token = useSecurityStore.getState().token;
      const decoded = jwt_decode(token || "") as any;
      //console.log(decoded["bookmakers_id"]);
      return dataSource.getBookmakersById(useSecurityStore.getState().bookmakersId);
    }
    return Promise.resolve(null);
  }

  public async login(credentials: Credentials): Promise<Response> {
    const response = await dataSource.login(credentials);
    console.log(response.ok);
    if (response.ok) {
      const body = await response.json();
      const authToken = body["access_token"];
      const refreshToken = body["refresh_token"];
      const expiresIn = Date.now() + (body["expires_in"] * 1000);
      console.log(body["users_id"]);
      console.log(body["bookmakers_id"]);
      useSecurityStore.setState(() => ({ token: authToken || "", userId: body["users_id"], bookmakersId: body["bookmakers_id"], logged: true, refreshToken: refreshToken, expiresIn: expiresIn }));
    } else {
      useSecurityStore.setState(() => ({ token: undefined, userId: undefined, bookmakersId: undefined, logged: false, refreshToken: undefined, expiresIn: undefined }));
    }
    return response;
  }

  public signOut(): void {
    useSecurityStore.setState({ token: undefined, userId: undefined, bookmakersId: undefined, logged: false, refreshToken: undefined });
  }

  public isLogged(): boolean {
    return useSecurityStore.getState().logged;
  }

  public async exchangeCodeForToken(code: string, codeVerifier: string, options?: any): Promise<any> {
    return await dataSource.exchangeCodeForToken(code, codeVerifier, options);
  }
  
  public buildLoginUrl(codeChallenge: string): string {
    const url = new URL(process.env.NEXT_PUBLIC_AUTHORIZATION_CODE_LOGIN || "/404");
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('client_id', process.env.NEXT_PUBLIC_AUTHORIZATION_CODE_CLIENT_ID || "");
    url.searchParams.set('redirect_uri', process.env.NEXT_PUBLIC_BASE_URL+"/callback");
    url.searchParams.set('scope', 'openid profile email');
    url.searchParams.set('code_challenge', codeChallenge);
    url.searchParams.set('code_challenge_method', 'S256');
    return url.toString();
  }

  public generateCodeVerifier(): string {
      const array = new Uint8Array(32);
      crypto.getRandomValues(array);
      return Array.from(array, (val) => val.toString(16).padStart(2, '0')).join('');
  }

  private utf8ToUint8Array(str: string): Uint8Array {
      if (typeof TextEncoder !== "undefined") {
          return new TextEncoder().encode(str);
      } else {
          // Node.js fallback
          return Uint8Array.from(Buffer.from(str, 'utf-8'));
      }
  }

  public async generateCodeChallenge(codeVerifier: string): Promise<string> {
      const data = this.utf8ToUint8Array(codeVerifier);
      const digest = await crypto.subtle.digest('SHA-256', data);
      const base64url = Buffer.from(digest)
          .toString('base64')
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=+$/, '');
      return base64url;
  };

  // Geração do código challenge
  public async generatePKCE(): Promise<{ codeVerifier: string; codeChallenge: string }> {
      const codeVerifier = this.generateRandomString(64);
      const codeChallenge = await this.generateCodeChallenge(codeVerifier);
      return { codeVerifier, codeChallenge };
  }

  public generateRandomString(length: number):string {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
      return Array.from(crypto.getRandomValues(new Uint8Array(length)))
          .map(x => chars[x % chars.length])
          .join('');
  }
}
