import { FieldValues, UseFormWatch } from "react-hook-form";

export const userIdValidation = {
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
};

export const emailValidation = {
  required: "이메일을 입력하세요.",
  pattern: {
    value: /\S+@\S+\.\S+/,
    message: "이메일 형식에 맞지 않습니다.",
  },
};

export const usernameValidation = {
  required: "닉네임을 입력하세요.",
  minLength: {
    value: 2,
    message: "닉네임은 최소 2글자 이상이여야 합니다.",
  },
  maxLength: {
    value: 8,
    message: "닉네임은 최대 8글자까지 허용됩니다.",
  },
};

export const passwordValidation = {
  required: "비밀번호를 입력해주세요.",
  pattern: {
    value:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+])[A-Za-z\!@#$%^&*()-_=+]{8,}/,
    message:
      "비밀번호는 영문 대소문자, 숫자, 특수문자 조합으로 8자 이상 입력해야합니다.",
  },
};

export const passwordConfirmValidation = (watch: UseFormWatch<FieldValues>) => {
  return {
    required: "비밀번호를 한번더 입력해주세요.",
    validate: (val: string | undefined) => {
      if (watch("password") != val) {
        return "비밀번호가 일치하지 않습니다.";
      }
    },
  };
};

export const yearValidation = {
  required: "년, ",
  pattern: {
    value: /^(19[0-9][0-9]|20[0-2][0-3])$/,
    message: "년, ",
  },
  minLength: 2,
  min: 1900,
  max: 2023,
};

export const monthValidation = {
  required: "월, ",
  pattern: {
    value: /^(0[1-9]|1[0-2])$/,
    message: "월, ",
  },
  minLength: 2,
};

export const dayValidation = {
  required: "일",
  pattern: {
    value: /^(0[1-9]|[1-2][0-9]|3[0-1])$/,
    message: "일",
  },
};
