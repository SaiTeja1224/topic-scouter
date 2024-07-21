import { create } from "zustand";
import { TUserPayload } from "../lib/types";

type TStore = {
  user: null | TUserPayload;
  login: (data: TUserPayload) => void;
  logout: () => void;
};

const useStore = create<TStore>()((set) => ({
  user: null,
  login: (data) => set(() => ({ user: data })),
  logout: () => set(() => ({ user: null })),
}));

export default useStore;
