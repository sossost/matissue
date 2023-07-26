import Cookies from "js-cookie";
import { axiosBase } from "./axios";
import { LoginClientProps } from "../auth/login/LoginClient";
import { FieldValues } from "react-hook-form";

export const login = async (data: LoginClientProps) => {
  const response = await axiosBase.post("users/login", data);
  const sessionId = response.data.session_id;
  Cookies.set("session-id", sessionId);
};

export const signup = async (data: FieldValues) => {
  const birthDate = data.year + "-" + data.month + "-" + data.day;
  const userData = {
    user_id: data.user_id,
    username: data.username,
    email: data.email,
    password: data.password,
    img: "https://eliceproject.s3.ap-northeast-2.amazonaws.com/dongs.png",
    birth_date: birthDate,
  };

  await axiosBase.post("users/", userData);
};

export const findUserId = async (data: FieldValues) => {
  await axiosBase.post("email/forgot-id/", data);
};

export const findPassword = async (data: FieldValues) => {
  await axiosBase.post("email/forgot-password/", data);
};
