import Image from "next/image";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import darkModeAtom from "../store/darkModeAtom";

const useShowPassword = () => {
  const isDarkMode = useRecoilValue(darkModeAtom);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirm, setShowPasswordConfirm] =
    useState<boolean>(false);

  const ShowIcon = ({ isPasswordConfirm }: { isPasswordConfirm?: boolean }) => {
    return (
      <ShowIconWrapper
        isDarkMode={isDarkMode}
        onClick={() => {
          isPasswordConfirm
            ? setShowPasswordConfirm(!showPasswordConfirm)
            : setShowPassword(!showPassword);
        }}
      >
        <Image
          src="/images/auth/showIcon.svg"
          height={16}
          width={18}
          alt="showIcon"
        />
      </ShowIconWrapper>
    );
  };

  return {
    ShowIcon,
    showPassword,
    showPasswordConfirm,
  };
};

export default useShowPassword;

const ShowIconWrapper = styled.div<{ isDarkMode: boolean }>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  top: 1.1rem;
  right: 1.1rem;
  cursor: pointer;
  filter: ${(props) =>
    props.isDarkMode
      ? "invert(89%) sepia(27%) saturate(436%) hue-rotate(334deg) brightness(105%) contrast(104%)"
      : "invert(18%) sepia(10%) saturate(2848%) hue-rotate(357deg) brightness(103%) contrast(82%)"};
`;
