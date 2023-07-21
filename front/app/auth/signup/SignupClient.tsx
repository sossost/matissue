"use client";

import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import Logo from "@/app/components/header/Logo";
import Button from "@/app/components/UI/Button";
import LoadingModal from "@/app/components/UI/LoadingModal";

import darkModeAtom from "@/app/store/darkModeAtom";
import useBirthForm from "@/app/hooks/useBirthForm";
import useSignup, { SignupValues } from "@/app/hooks/useSignup";
import useShowPassword from "@/app/hooks/useShowPassword";

import {
  AuthContainer,
  AuthFormWrapper,
  AuthNavBox,
  ErrorMessageText,
  PasswordInputWrapper,
  StyledInput,
  StyledLabel,
  UnderLineLinkDiv,
} from "@/app/styles/auth/auth.style";
import {
  emailValidation,
  passwordValidation,
  userIdValidation,
  usernameValidation,
} from "@/app/constants/validation.constants";
import BirthDayForm from "@/app/components/auth/BirthDayForm";

const SignupClient = () => {
  const {
    register,
    watch,
    resetField,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      user_id: "",
      username: "",
      email: "",
      password: "",
      password_confirm: "",
      year: "",
      month: "",
      day: "",
    },
  });
  const { isLoading, signup } = useSignup();
  const BirthForm = useBirthForm({
    watch,
    resetField,
    setValue,
  });

  const { ShowIcon, showPassword, showPasswordConfirm } = useShowPassword();

  const isDarkMode = useRecoilValue(darkModeAtom);
  const router = useRouter();

  /** auth 폼 제출 핸들러 */
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    signup(data as SignupValues);
  };

  return (
    <AuthContainer isDarkMode={isDarkMode}>
      {isLoading && <LoadingModal />}
      <AuthFormWrapper>
        <Logo />
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 아이디 인풋 박스 */}
          <UserIdInputBox>
            <StyledLabel htmlFor="user_id">아이디</StyledLabel>
            <StyledInput
              id="user_id"
              disabled={isLoading}
              {...register("user_id", userIdValidation)}
              placeholder="아이디를 입력하세요."
            />
            {errors.user_id && (
              <ErrorMessageText>
                {errors.user_id.message?.toString()}
              </ErrorMessageText>
            )}
          </UserIdInputBox>

          {/* 이메일 인풋 박스 */}
          <EmailInputBox>
            <StyledLabel htmlFor="email">이메일</StyledLabel>
            <StyledInput
              id="email"
              type="email"
              disabled={isLoading}
              {...register("email", emailValidation)}
              placeholder="이메일을 입력하세요."
            />
            {errors.email && (
              <ErrorMessageText>
                {errors.email.message?.toString()}
              </ErrorMessageText>
            )}
          </EmailInputBox>

          {/* 닉네임 인풋 박스 */}
          <UsernameInputBox>
            <StyledLabel htmlFor="username">닉네임</StyledLabel>
            <StyledInput
              id="username"
              type="text"
              disabled={isLoading}
              {...register("username", usernameValidation)}
              placeholder="닉네임을 입력하세요."
            />
            {errors.username && (
              <ErrorMessageText>
                {errors.username.message?.toString()}
              </ErrorMessageText>
            )}
          </UsernameInputBox>

          {/* 패스워드 인풋 박스 */}
          <PasswordInputBox>
            <StyledLabel htmlFor="password">비밀번호</StyledLabel>
            <PasswordInputWrapper>
              <ShowIcon />
              <StyledInput
                id="password"
                type={showPassword ? "text" : "password"}
                disabled={isLoading}
                {...register("password", passwordValidation)}
                placeholder="비밀번호를 입력하세요."
              />
            </PasswordInputWrapper>
            {errors.password && (
              <ErrorMessageText>
                {errors.password.message?.toString()}
              </ErrorMessageText>
            )}
            <br />
            <div className="relative">
              <ShowIcon isPasswordConfirm={true} />
              <StyledInput
                id="password_confirm"
                type={showPasswordConfirm ? "text" : "password"}
                disabled={isLoading}
                {...register("password_confirm", {
                  required: "비밀번호를 한번더 입력해주세요.",
                  validate: (val: string | undefined) => {
                    if (watch("password") != val) {
                      return "비밀번호가 일치하지 않습니다.";
                    }
                  },
                })}
                placeholder="비밀번호를 한번더 입력하세요."
              />
              {errors.password_confirm && (
                <ErrorMessageText>
                  {errors.password_confirm.message?.toString()}
                </ErrorMessageText>
              )}
            </div>
          </PasswordInputBox>

          {/* 생년월일 인풋 박스 */}
          <BirthDayInputBox>
            <BirthDayForm
              isLoading={isLoading}
              BirthForm={BirthForm}
              register={register}
              errors={errors}
            />
          </BirthDayInputBox>

          {/* 회원가입 버튼 */}
          <Button disabled={isLoading} fullWidth isBgColor type="submit">
            회원가입
          </Button>
        </form>

        <AuthNavBox>
          <div>이미 아이디가 있으신가요?</div>
          <UnderLineLinkDiv
            onClick={() => {
              router.push("/auth/login");
            }}
          >
            로그인하기
          </UnderLineLinkDiv>
        </AuthNavBox>
        <br />
        <br />
      </AuthFormWrapper>
    </AuthContainer>
  );
};

export default SignupClient;

const UserIdInputBox = styled.div``;
const EmailInputBox = styled.div``;
const UsernameInputBox = styled.div``;
const PasswordInputBox = styled.div``;
const BirthDayInputBox = styled.div``;
