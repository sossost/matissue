import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

import getCurrentUser from "../api/user";
import { axiosBase } from "../api/axios";

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const client = useQueryClient();
  const router = useRouter();

  const login = async (data: { user_id: string; password: string }) => {
    setIsLoading(true);
    try {
      // 로그인 요청하여 session-id를 받아옴
      const response = await axiosBase.post("users/login", data);
      const sessionId = response.data.session_id;
      Cookies.set("session-id", sessionId);

      // 로그인 후 현재 유저 정보를 받아와서 캐시에 저장
      const currentUser = await getCurrentUser();
      client.setQueryData(["currentUser"], currentUser);

      router.back();
      toast.success("로그인 되었습니다.");
    } catch (err: any) {
      const errorMessage = err?.response.data.detail;
      toast.error(
        errorMessage
          ? errorMessage
          : "등록되지 않은 아이디거나 아이디 또는 비밀번호를 잘못 입력했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, login };
};

export default useLogin;
