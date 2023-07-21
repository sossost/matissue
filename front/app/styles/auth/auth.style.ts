import styled from "styled-components";

type StyledInputProps = {
  disabled?: boolean;
};

type BirthdayInputProps = {
  disabled?: boolean;
  isYear?: boolean;
};

export const AuthContainer = styled.div<{ isDarkMode: boolean }>`
  margin-top: 3.2rem;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 40rem;
  // box-shadow: 0 0 0.2rem 0
  //   ${(props) =>
    props.isDarkMode ? "rgb(255 255 255)" : "rgb(0 0 0 / 0.25)"};
  // border-radius: 1.5rem;

  color: ${(props) =>
    props.isDarkMode ? props.theme.white : props.theme.brown};
`;

export const AuthFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 4rem;
  padding: 3.2rem;

  min-height: 100vh;

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 2rem;
  }
`;

export const StyledLabel = styled.label`
  display: inline-block;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 1rem;
  padding-left: 0.5rem;
`;

export const StyledInput = styled.input<StyledInputProps>`
  appearance: none;
  padding: 0.6rem 1.2rem;
  font-size: 16px;
  line-height: 2.4rem;
  display: block;
  width: 100%;
  height: 4.8rem;
  border-radius: 1.5rem;
  outline: none;
  &:focus {
  opacity: ${(props) => props.disabled && "0.5"};
  cursor: ${(props) => props.disabled && "default"};

  &:placeholder {
    color: #999;
  }
`;

export const PasswordInputWrapper = styled.div`
  position: relative;
`;

export const BirthDayInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const BirthDayInput = styled(StyledInput)<BirthdayInputProps>`
  width: ${(props) => (props.isYear ? "16rem" : "8rem")};
  }
`;

export const ErrorMessageText = styled.span`
  display: inline-block;
  padding: 0.3rem 1.3rem 0 1.3rem;
  font-size: 13px;
  color: #ff2f2f;
`;

export const AuthNavBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
  font-size: 16px;
  color: #999;
`;

export const AuthChangeBox = styled(AuthNavBox)`
  justify-content: center;
`;

export const UnderLineLinkDiv = styled.div`
  text-decoration-line: underline;
  cursor: pointer;
`;
