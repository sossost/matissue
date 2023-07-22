"use client";

import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import darkModeAtom from "@/app/store/darkModeAtom";
import useBirtDayInput from "@/app/hooks/useBirthDayInput";
import useSignup, { SignupValues } from "@/app/hooks/useSignup";
import { Input } from "@/app/components/common/Input";
import { PasswordInput } from "@/app/components/auth/PasswordInput";

import {
  AuthContainer,
  AuthFormWrapper,
  AuthNavBox,
  UnderLineLinkDiv,
} from "@/app/styles/auth/auth.style";
import {
  emailValidation,
  passwordValidation,
  userIdValidation,
  usernameValidation,
} from "@/app/constants/validation.constants";

import Logo from "@/app/components/header/Logo";
import Button from "@/app/components/UI/Button";
import LoadingModal from "@/app/components/UI/LoadingModal";
import BirthDayInput from "@/app/components/auth/BirthDayInput";

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
  const BirthForm = useBirtDayInput({
    watch,
    resetField,
    setValue,
  });

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
          <Input label="아이디">
            <Input.TextField
              id="user_id"
              disabled={isLoading}
              {...register("user_id", userIdValidation)}
              placeholder="아이디를 입력하세요."
              errors={errors}
            />
          </Input>

          <Input label="이메일">
            <Input.TextField
              id="email"
              type="email"
              disabled={isLoading}
              {...register("email", emailValidation)}
              placeholder="이메일을 입력하세요."
              errors={errors}
            />
          </Input>

          <Input label="닉네임">
            <Input.TextField
              id="username"
              type="text"
              disabled={isLoading}
              {...register("username", usernameValidation)}
              placeholder="닉네임을 입력하세요."
              errors={errors}
            />
          </Input>

          <PasswordInput label="비밀번호">
            <PasswordInput.TextField
              id="password"
              disabled={isLoading}
              {...register("password", passwordValidation)}
              placeholder="비밀번호를 입력하세요."
              errors={errors}
            />
            <PasswordInput.TextField
              id="password_confirm"
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
              errors={errors}
            />
          </PasswordInput>

          <BirthDayInput
            isLoading={isLoading}
            BirthForm={BirthForm}
            register={register}
            errors={errors}
          />

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

const PasswordInputBox = styled.div``;
