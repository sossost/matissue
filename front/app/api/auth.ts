import Cookies from "js-cookie";
import { axiosBase } from "./axios";
import { LoginClientProps } from "../auth/login/LoginClient";

export const login = async (data: LoginClientProps) => {
  const response = await axiosBase.post("users/login", data);
  const sessionId = response.data.session_id;
  Cookies.set("session-id", sessionId);
};
