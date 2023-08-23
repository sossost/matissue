"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRecoilValue } from "recoil";

import { findPassword, findUserId } from "@/src/app/api/auth";
import useEmailSentModal from "./hooks/useEmailSentModal";
import useBirtDayInput from "@/src/hooks/useBirthDayInput";
import darkModeAtom from "@/src/store/darkModeAtom";
import useVariantSelector from "@/src/hooks/useVariantSelector";

import { Input } from "@/src/components/common/Input";
import LoadingModal from "@/src/components/UI/LoadingModal";
import BirthDayInput from "@/src/components/auth/BirthDayInput";
import Logo from "@/src/components/header/Logo";
import Button from "@/src/components/UI/Button";

import { AuthContainer, AuthFormWrapper } from "@/src/styles/auth/auth.style";
import {
  emailValidation,
  userIdValidation,
} from "@/src/constants/validation.constants";

const FindIdPasswordClient = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    watch,
    resetField,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();
  const { message, setMessage, EmailSentModal } = useEmailSentModal();
  const { selectedVariant, VariantSelector } = useVariantSelector<
    "아이디 찾기",
    "비밀번호 찾기"
  >({
    variant1: "아이디 찾기",
    variant2: "비밀번호 찾기",
    initialVariant: "아이디 찾기",
  });
  const isDarkMode = useRecoilValue(darkModeAtom);
  const BirthForm = useBirtDayInput({
    watch,
    resetField,
    setValue,
  });

  /** 아이디, 비밀번호 찾기 제출 핸들러 */
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    const birthDate = data.year + "-" + data.month + "-" + data.day;

    if (selectedVariant === "아이디 찾기") {
      const userData = {
        email: data.email,
        birth_date: birthDate,
      };

      try {
        await findUserId(userData);
        setMessage("아이디가 입력하신 메일로 발송되었습니다.");
        reset();
      } catch (error: any) {
        toast.error(error.response.data.detail);
      } finally {
        setIsLoading(false);
      }
    }

    if (selectedVariant === "비밀번호 찾기") {
      const userData = {
        user_id: data.user_id,
        birth_date: birthDate,
      };
      try {
        findPassword(userData);
        setMessage("임시비밀번호가 입력하신 메일로 발송되었습니다.");
        reset();
      } catch (error: any) {
        toast.error(error.response.data.detail);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <AuthContainer isDarkMode={isDarkMode}>
      {isLoading && <LoadingModal />}
      {message && <EmailSentModal />}
      <AuthFormWrapper>
        <Logo />
        <VariantSelector />
        <form onSubmit={handleSubmit(onSubmit)}>
          {selectedVariant === "비밀번호 찾기" && (
            <Input label="아이디">
              <Input.TextField
                id="user_id"
                disabled={isLoading}
                {...register("user_id", userIdValidation)}
                placeholder="아이디를 입력하세요."
                errors={errors}
              />
            </Input>
          )}

          {selectedVariant === "아이디 찾기" && (
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
          )}

          <BirthDayInput
            label="생년월일"
            isLoading={isLoading}
            BirthForm={BirthForm}
            register={register}
            errors={errors}
          />
          <Button isBgColor={true}>{selectedVariant}</Button>
        </form>
      </AuthFormWrapper>
    </AuthContainer>
  );
};

export default FindIdPasswordClient;
