import create from "zustand";
import { persist } from "zustand/middleware";
import { ISecurityStore } from "../types/SecurityStoreType";

export const useSecurityStore = create<ISecurityStore>(
  persist(
    (set, _get) => ({
      userId: undefined,
      bookmakersId: undefined,
      logged: false,
      token: undefined,
      refreshToken: undefined,
    }),
    {
      name: "auth_store",
    }
  )
);

export default useSecurityStore;
