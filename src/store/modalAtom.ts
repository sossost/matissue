import { atom } from "recoil";

const authModalAtom = atom<boolean>({
  key: "authModalState",
  default: false,
});

export default authModalAtom;
