"use client";

import { axiosBase } from "@/app/api/axios";
import Button from "@/app/components/UI/Button";
import LoadingModal from "@/app/components/UI/LoadingModal";
import BirthDayForm from "@/app/components/auth/BirthDayForm";
import ConfirmModal from "@/app/components/auth/ConfirmModal";
import Logo from "@/app/components/header/Logo";
import useBirthForm from "@/app/hooks/useBirthForm";
import darkModeAtom from "@/app/store/darkModeAtom";
import {
  AuthContainer,
  AuthFormWrapper,
  ErrorMessageText,
  StyledInput,
  StyledLabel,
} from "@/app/styles/auth/auth.style";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRecoilValue } from "recoil";
import styled, { css } from "styled-components";

type Variant = "아이디" | "비밀번호";

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
  const [variant, setVariant] = useState<Variant>("아이디");
  const [message, setMessage] = useState<string>("");
  const isDarkMode = useRecoilValue(darkModeAtom);

  const BirthForm = useBirthForm({
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
        <VariantWrapper>
          <VariantBox>
            <VariantBoxItem
              active={variant === "아이디"}
              onClick={() => {
                setVariant("아이디");
              }}
            >
              아이디 찾기
            </VariantBoxItem>
            <VariantBoxItem
              active={variant === "비밀번호"}
              onClick={() => {
                setVariant("비밀번호");
              }}
            >
              비밀번호 찾기
            </VariantBoxItem>
          </VariantBox>
          <VariantNoticeBar variant={variant} isDarkMode={isDarkMode} />
        </VariantWrapper>
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
                <ErrorMessageText>
                  {errors.user_id.message?.toString()}
                </ErrorMessageText>
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
                <ErrorMessageText>
                  {errors.email.message?.toString()}
                </ErrorMessageText>
              )}
            </div>
          )}

          {/* 생년월일 인풋 박스 */}
          <BirthDayInputBox>
            <BirthDayForm
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
const VariantWrapper = styled.div`
  width: 100%;
`;

const VariantBox = styled.div`
  font-size: 16px;
  width: 100%;
  display: flex;
`;

const VariantBoxItem = styled.div<{ active: boolean }>`
  width: 50%;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  font-weight: 400;

  ${(props) =>
    props.active &&
    css`
      font-weight: 600;
    `};
`;

const VariantNoticeBar = styled.div<{ variant: Variant; isDarkMode: boolean }>`
  width: 50%;
  border-bottom: 0.3rem solid
    ${(props) =>
      props.isDarkMode ? props.theme.lightYellow : props.theme.yellow};
  transform: translateX(
    ${(props) => (props.variant === "아이디" ? "0" : "100%")}
  );
  transition: transform 0.3s;
`;

const BirthDayInputBox = styled.div``;

export default FindIdPasswordClient;
