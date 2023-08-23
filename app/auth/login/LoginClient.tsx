"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { useState } from "react";
import { login } from "@/app/api/auth";
import { useQueryClient } from "@tanstack/react-query";

import getCurrentUser from "@/app/api/user";
import darkModeAtom from "@/app/store/darkModeAtom";

import Logo from "@/app/components/header/Logo";
import Button from "@/app/components/UI/Button";
import LoadingModal from "@/app/components/UI/LoadingModal";

import {
  AuthContainer,
  AuthFormWrapper,
  AuthNavBox,
  StyledInput,
} from "@/app/styles/auth/auth.style";
import { toast } from "react-hot-toast";
import Link from "next/link";

export interface LoginClientProps {
  user_id: string;
  password: string;
}

const LoginClient = () => {
  const [isLoading, setIsLoading] = useState(false);

  const isDarkMode = useRecoilValue(darkModeAtom);
  const router = useRouter();
  const client = useQueryClient();
  const { register, handleSubmit } = useForm<LoginClientProps>();

  /** auth 폼 제출 핸들러 */
  const onSubmit: SubmitHandler<LoginClientProps> = async (data) => {
    setIsLoading(true);
    try {
      // 로그인 http 통신 함수
      await login(data);

      // 로그인 후 현재 유저 정보를 받아와서 캐시에 저장
      const currentUser = await getCurrentUser();
      client.setQueryData(["currentUser"], currentUser);

      router.back();
      toast.success("로그인 되었습니다.");
    } catch (error: any) {
      const errorMessage = error?.response.data.detail;
      toast.error(
        errorMessage
          ? errorMessage
          : "등록되지 않은 아이디거나 아이디 또는 비밀번호를 잘못 입력했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContainer isDarkMode={isDarkMode}>
      {isLoading && <LoadingModal />}
      <LoginAuthContainer>
        <Logo />
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledInput
            id="user_id"
            placeholder="아이디를 입력하세요."
            type="text"
            disabled={isLoading}
            {...register("user_id", {
              required: true,
            })}
          />
          <StyledInput
            id="password"
            placeholder="비밀번호를 입력하세요."
            type="password"
            disabled={isLoading}
            {...register("password", {
              required: true,
            })}
          />
          <Button disabled={isLoading} fullWidth isBgColor type="submit">
            로그인
          </Button>
          <AuthNavBox>
            <Link href="/auth/find-id-password">아이디•비밀번호 찾기</Link>
            <Link
              href="/auth/signup"
              style={{ textDecorationLine: "underline" }}
            >
              회원가입하기
            </Link>
          </AuthNavBox>
        </form>
      </LoginAuthContainer>
    </AuthContainer>
  );
};

export default LoginClient;

const LoginAuthContainer = styled(AuthFormWrapper)`
  padding-top: 5rem;
  @media (min-width: 1024px) {
    padding-top: 13rem;
  }
`;
