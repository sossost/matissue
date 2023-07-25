"use client";

import { axiosBase } from "@/app/api/axios";
import styled, { css } from "styled-components";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRecoilValue } from "recoil";

import Button from "@/app/components/UI/Button";
import LoadingModal from "@/app/components/UI/LoadingModal";
import BirthDayInput from "@/app/components/auth/BirthDayInput";
import ConfirmModal from "@/app/components/auth/ConfirmModal";
import Logo from "@/app/components/header/Logo";

import useBirtDayInput from "@/app/hooks/useBirthDayInput";
import darkModeAtom from "@/app/store/darkModeAtom";
import {
  AuthContainer,
  AuthFormWrapper,
  InputErrorText,
  StyledInput,
  StyledLabel,
} from "@/app/styles/auth/auth.style";
import useVariantSelector from "@/app/hooks/useVariantSelector";

const FindIdPasswordClient = () => {
  const router = useRouter();
  const {
    register,
    watch,
    resetField,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { variant, VariantSelector } = useVariantSelector();

  const [message, setMessage] = useState<string>("");
  const isDarkMode = useRecoilValue(darkModeAtom);

  const BirthForm = useBirtDayInput({
    watch,
    resetField,
    setValue,
  });

  /** 아이디, 비밀번호 찾기 제출 핸들러 */
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    const birthDate = data.year + "-" + data.month + "-" + data.day;

    if (variant === "아이디") {
      const userData = {
        email: data.email,
        birth_date: birthDate,
      };
      axiosBase
        .post("email/forgot-id/", userData)
        .then((res) => {
          setMessage("아이디가 입력하신 메일로 발송되었습니다.");
          reset();
        })
        .catch((error) => toast.error(error.response.data.detail))
        .finally(() => setIsLoading(false));
    }

    if (variant === "비밀번호") {
      const userData = {
        user_id: data.user_id,
        birth_date: birthDate,
      };
      axiosBase
        .post("email/forgot-password/", userData)
        .then((res) => {
          setMessage("임시비밀번호가 입력하신 메일로 발송되었습니다.");
          reset();
        })
        .catch((error) => toast.error(error.response.data.detail))
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <AuthContainer isDarkMode={isDarkMode}>
      {isLoading && <LoadingModal />}
      {message && (
        <ConfirmModal
          onConfirm={() => {
            router.replace("/auth/login");
          }}
          onClose={() => {
            setMessage("");
          }}
          btnValue="로그인 하기"
          message={message}
        />
      )}
      <AuthFormWrapper>
        <Logo />
        <VariantSelector />
        <form onSubmit={handleSubmit(onSubmit)}>
          {variant === "비밀번호" && (
            <div id="user_id_input">
              <StyledLabel htmlFor="user_id">아이디</StyledLabel>
              <StyledInput
                id="user_id"
                disabled={isLoading}
                {...register("user_id", {
                  required: "아이디를 입력하세요.",
                  pattern: {
                    value: /^[A-Za-z0-9]+$/,
                    message: "아이디는 영어와 숫자만 가능합니다.",
                  },
                  minLength: {
                    value: 4,
                    message: "아이디는 최소 4글자 이상이여야 합니다.",
                  },
                  maxLength: {
                    value: 12,
                    message: "아이디는 최대 12글자까지 허용됩니다.",
                  },
                })}
                placeholder="아이디를 입력하세요."
              />
              {errors.user_id && (
                <InputErrorText>
                  {errors.user_id.message?.toString()}
                </InputErrorText>
              )}
            </div>
          )}
          {variant === "아이디" && (
            <div id="email">
              <StyledLabel htmlFor="email">이메일</StyledLabel>
              <StyledInput
                id="email"
                type="email"
                disabled={isLoading}
                {...register("email", {
                  required: "이메일을 입력하세요.",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "이메일 형식에 맞지 않습니다.",
                  },
                })}
                placeholder="이메일을 입력하세요."
              />
              {errors.email && (
                <InputErrorText>
                  {errors.email.message?.toString()}
                </InputErrorText>
              )}
            </div>
          )}

          {/* 생년월일 인풋 박스 */}
          <BirthDayInputBox>
            <BirthDayInput
              isLoading={isLoading}
              BirthForm={BirthForm}
              register={register}
              errors={errors}
            />
          </BirthDayInputBox>

          <Button isBgColor={true}>{variant} 찾기</Button>
        </form>
      </AuthFormWrapper>
    </AuthContainer>
  );
};

const BirthDayInputBox = styled.div``;

export default FindIdPasswordClient;
