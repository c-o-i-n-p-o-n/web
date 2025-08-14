
export interface ISecurityStore {
  userId?: number;
  bookmakersId?: number;
  logged: boolean;
  token?: string;
  refreshToken?: string;
}
