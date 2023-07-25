import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import {
  dayValidation,
  monthValidation,
  yearValidation,
} from "@/app/constants/validation.constants";
import {
  StyledLabel,
  InputErrorText,
  StyledInput,
} from "@/app/styles/auth/auth.style";
import styled from "styled-components";

type BirthDayInputProps = {
  isLoading: boolean;
  BirthForm: {
    yearInputRef: React.RefObject<HTMLInputElement>;
    monthInputRef: React.RefObject<HTMLInputElement>;
    dayInputRef: React.RefObject<HTMLInputElement>;
    yearChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
    monthChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
    dayChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
    yearValue: string;
    monthValue: string;
    dayValue: string;
  };
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

const BirthDayInput = ({
  isLoading,
  BirthForm,
  register,
  errors,
}: BirthDayInputProps) => {
  return (
    <Container>
      <StyledLabel>생년월일</StyledLabel>
      <Wrapper>
        <YearInput
          id="year"
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
        <MonthInput
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
        <DayInput
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
      </Wrapper>
      {(errors.year || errors.month || errors.day) && (
        <InputErrorText>
          생년월일 형식을 올바르게 입력해주세요.(ex 2000.01.01)
        </InputErrorText>
      )}
    </Container>
  );
};

export default BirthDayInput;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
`;

const YearInput = styled(StyledInput)`
  flex: 2;
`;

const MonthInput = styled(StyledInput)`
  flex: 1;
`;

const DayInput = styled(StyledInput)`
  flex: 1;
`;
