"use client";

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
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
  BirthdayInput,
  BirthDayInputWrapper,
  ErrorMessageText,
  PasswordInputWrapper,
  StyledInput,
  StyledLabel,
  UnderLineLinkDiv,
} from "@/app/styles/auth/auth.style";
import {
  dayValidation,
  emailValidation,
  monthValidation,
  passwordValidation,
  userIdValidation,
  usernameValidation,
  yearValidation,
} from "@/app/constants/validation.constants";

const SignupClient = () => {
  const {
    register,
    watch,
    resetField,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupValues>({
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
    register,
    isLoading,
    formState: { errors },
  });

  const { ShowIcon, showPassword, showPasswordConfirm } = useShowPassword();

  const isDarkMode = useRecoilValue(darkModeAtom);
  const router = useRouter();

  /** auth 폼 제출 핸들러 */
  const onSubmit: SubmitHandler<SignupValues> = (data) => {
    signup(data);
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
              <ShowIcon />
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
            <StyledLabel>생년월일</StyledLabel>
            <BirthDayInputWrapper>
              <BirthdayInput
                id="year"
                isYear={true}
                type="number"
                autoComplete="year"
                disabled={isLoading}
                {...register("year", yearValidation)}
                maxLength={4}
                ref={BirthForm.yearInputRef}
                onChange={BirthForm.yearChangeHandler}
                value={BirthForm.yearValue || ""}
                placeholder="YYYY"
              />
              <BirthdayInput
                id="month"
                type="number"
                autoComplete="month"
                disabled={isLoading}
                {...register("month", monthValidation)}
                maxLength={2}
                ref={BirthForm.monthInputRef}
                onChange={BirthForm.monthChangeHandler}
                value={BirthForm.monthValue || ""}
                placeholder="MM"
              />
              <BirthdayInput
                id="day"
                type="number"
                autoComplete="day"
                disabled={isLoading}
                {...register("day", dayValidation)}
                maxLength={2}
                ref={BirthForm.dayInputRef}
                onChange={BirthForm.dayChangeHandler}
                value={BirthForm.dayValue || ""}
                placeholder="DD"
              />
            </BirthDayInputWrapper>
            {(errors.year || errors.month || errors.day) && (
              <ErrorMessageText>
                생년월일 형식을 올바르게 입력해주세요.(ex 2000.01.01)
              </ErrorMessageText>
            )}
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
