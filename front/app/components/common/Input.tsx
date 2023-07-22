import uuid from "react-uuid";
import React, {
  Children,
  ForwardedRef,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
  cloneElement,
} from "react";
import styled from "styled-components";
import { FieldErrors, FieldValues } from "react-hook-form";
import { InputErrorText, StyledInput } from "@/app/styles/auth/auth.style";

interface InputProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode;
  children: ReactElement;
}

export function Input({ label, children, ...props }: InputProps) {
  const child = Children.only(children);
  const generatedId = uuid();
  const id = child.props.id || generatedId;
  const errors = child.props.errors;

  return (
    <InputWrapper {...props}>
      <StyledLabel htmlFor={id}>{label}</StyledLabel>

      {cloneElement(child, { id, ...child.props })}

      {errors[id] && (
        <InputErrorText>{errors[id].message?.toString()}</InputErrorText>
      )}
    </InputWrapper>
  );
}

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  errors?: FieldErrors<FieldValues>;
}

Input.TextField = React.forwardRef(
  (
    { disabled, errors, ...props }: TextFieldProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return <StyledInput disabled={disabled} ref={ref} {...props} />;
  }
);

Input.TextField.displayName = "TextField";

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
