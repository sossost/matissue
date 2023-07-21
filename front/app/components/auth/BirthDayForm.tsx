import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import {
  dayValidation,
  monthValidation,
  yearValidation,
} from "@/app/constants/validation.constants";
import {
  BirthDayInputWrapper,
  BirthDayInput,
  StyledLabel,
  ErrorMessageText,
} from "@/app/styles/auth/auth.style";

type BirthDayFormProps = {
  isLoading: boolean;
  BirthForm: any;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

const BirthDayForm = ({
  isLoading,
  BirthForm,
  register,
  errors,
}: BirthDayFormProps) => {
  return (
    <>
      <StyledLabel>생년월일</StyledLabel>
      <BirthDayInputWrapper>
        <BirthDayInput
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
        <BirthDayInput
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
        <BirthDayInput
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
    </>
  );
};

export default BirthDayForm;
