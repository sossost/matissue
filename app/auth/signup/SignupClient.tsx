"use client";

import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";

import darkModeAtom from "@/app/store/darkModeAtom";
import useBirtDayInput from "@/app/hooks/useBirthDayInput";
import { Input } from "@/app/components/common/Input";
import { PasswordInput } from "@/app/components/auth/PasswordInput";

import {
  AuthContainer,
  AuthFormWrapper,
  AuthNavBox,
} from "@/app/styles/auth/auth.style";
import {
  emailValidation,
  passwordConfirmValidation,
  passwordValidation,
  userIdValidation,
  usernameValidation,
} from "@/app/constants/validation.constants";

import Logo from "@/app/components/header/Logo";
import Button from "@/app/components/UI/Button";
import LoadingModal from "@/app/components/UI/LoadingModal";
import BirthDayInput from "@/app/components/auth/BirthDayInput";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { signup } from "@/app/api/auth";

export interface SignupValues {
  user_id: string;
  username: string;
  email: string;
  password: string;
  password_confirm?: string;
  img: string;
  year: string;
  month: string;
  day: string;
}

const SignupClient = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isDarkMode = useRecoilValue(darkModeAtom);
  const router = useRouter();
  const {
    register,
    watch,
    resetField,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();
  const BirthForm = useBirtDayInput({
    watch,
    resetField,
    setValue,
  });

  /** auth 폼 제출 핸들러 */
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await signup(data);
      router.push("/auth/signup/complete");
    } catch (error: any) {
      toast.error(error.response.data.detail);
    } finally {
      setIsLoading(false);
    }
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
              {...register(
                "password_confirm",
                passwordConfirmValidation(watch)
              )}
              placeholder="비밀번호를 한번더 입력하세요."
              errors={errors}
            />
          </PasswordInput>

          <BirthDayInput
            label="생년월일"
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
          <Link href="/auth/login" style={{ textDecorationLine: "underline" }}>
            로그인하기
          </Link>
        </AuthNavBox>
        <br />
        <br />
      </AuthFormWrapper>
    </AuthContainer>
  );
};

export default SignupClient;
