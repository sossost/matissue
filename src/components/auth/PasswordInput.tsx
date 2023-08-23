import uuid from "react-uuid";
import React, {
  ForwardedRef,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
  cloneElement,
} from "react";
import styled from "styled-components";
import { InputErrorText, StyledInput } from "@/src/styles/auth/auth.style";
import useShowPassword from "@/src/hooks/useShowPassword";

interface InputProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode;
  children: [ReactElement, ReactElement];
}

export function PasswordInput({ label, children, ...props }: InputProps) {
  const id = children[0].props.id || uuid();

  return (
    <InputWrapper {...props}>
      <StyledLabel htmlFor={id}>{label}</StyledLabel>

      {cloneElement(children[0], { id, ...children[0].props })}
      <br />
      {cloneElement(children[1], { id, ...children[1].props })}
    </InputWrapper>
  );
}

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  errors: any;
}

PasswordInput.TextField = React.forwardRef(
  (
    { disabled, errors, ...props }: TextFieldProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const { ShowIcon, showPassword } = useShowPassword();
    const id = props.id || (uuid() as any);

    return (
      <>
        <TextFieldWrapper>
          <ShowIcon />
          <StyledInput
            disabled={disabled}
            ref={ref}
            type={showPassword ? "text" : "password"}
            {...props}
          />
        </TextFieldWrapper>
        {errors[id] && (
          <InputErrorText>{errors[id].message?.toString()}</InputErrorText>
        )}
      </>
    );
  }
);

PasswordInput.TextField.displayName = "TextField";

const InputWrapper = styled.div`
  width: 100%;
`;

const StyledLabel = styled.label`
  display: inline-block;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 1rem;
  padding-left: 0.5rem;
`;

const TextFieldWrapper = styled.div`
  position: relative;
`;
