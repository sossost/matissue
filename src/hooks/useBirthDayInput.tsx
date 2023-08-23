import { useCallback, useRef } from "react";
import {
  FieldValues,
  UseFormResetField,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { toast } from "react-hot-toast";

type useBirthDayInputProps = {
  watch: UseFormWatch<FieldValues>;
  resetField: UseFormResetField<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
};

const useBirtDayInput = ({
  watch,
  resetField,
  setValue,
}: useBirthDayInputProps) => {
  const yearInputRef = useRef<HTMLInputElement>(null);
  const monthInputRef = useRef<HTMLInputElement>(null);
  const dayInputRef = useRef<HTMLInputElement>(null);

  const yearValue = watch("year");
  const monthValue = watch("month");
  const dayValue = watch("day");

  const birthError = useCallback(() => {
    return toast.error("올바른 생년월일을 입력하세요.");
  }, []);

  const yearValidation = (year: string) => {
    if (+year < 0 || +year > 2023) {
      resetField("year");
      birthError();
      yearInputRef.current?.focus();
      return false;
    }
    return true;
  };

  const monthValidation = (month: string) => {
    if (0 > +month || +month > 12) {
      resetField("month");
      birthError();
      monthInputRef.current?.focus();
      return false;
    }
    return true;
  };

  const dayValidation = (day: string) => {
    if ([1, 3, 5, 7, 8, 12].includes(+monthValue) && (0 > +day || +day > 32)) {
      resetField("day");
      birthError();
      dayInputRef.current?.focus();
      return false;
    } else if ([4, 6, 9, 11].includes(+monthValue) && (0 > +day || +day > 31)) {
      resetField("day");
      birthError();
      dayInputRef.current?.focus();
      return false;
    } else if ([NaN, 2].includes(+monthValue) && (0 > +day || +day > 30)) {
      resetField("day");
      birthError();
      dayInputRef.current?.focus();
      return false;
    }
    return true;
  };

  /** 4자리 입력시 month인풋으로 포커스이동, 다시 입력해서 5자리이상이되면 year 인풋 리셋 */
  const yearChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const year = e.target.value;

    if (!yearValidation(year)) return;

    if (year.length === 4) {
      monthInputRef.current?.focus();
    }

    setValue("year", year);
  };

  /** 2자리 입력시 day인풋으로 포커스이동, 다시 입력해서 3자리이상이되면 month 인풋 리셋 */
  const monthChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const month = e.target.value;

    if (!monthValidation(month)) return;

    if (month.length === 2) {
      dayInputRef.current?.focus();
    }

    setValue("month", month);
  };

  /** 2자리 입력시 day인풋에서 포커스 제거, 다시 입력해서 3자리이상이되면 day 인풋 리셋 */
  const dayChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const day = e.target.value;

    if (!dayValidation(day)) return;

    if (day.length === 2) {
      dayInputRef.current?.blur();
    }

    setValue("day", day);
  };

  return {
    yearInputRef,
    monthInputRef,
    dayInputRef,
    yearValue,
    monthValue,
    dayValue,
    yearChangeHandler,
    monthChangeHandler,
    dayChangeHandler,
    birthError,
  };
};

export default useBirtDayInput;
