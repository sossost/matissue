import { useState, useRef } from "react";
import { useRecoilValue } from "recoil";
import styled, { css } from "styled-components";
import darkModeAtom from "../store/darkModeAtom";

type Variant = "아이디" | "비밀번호";

const useVariantSelector = () => {
  const [variant, setVariant] = useState<Variant>("아이디");
  const prevVariantRef = useRef<Variant>("아이디"); // useRef로 이전 variant 관리
  const isDarkMode = useRecoilValue(darkModeAtom);

  const handleClick = (newVariant: Variant) => {
    // 이전 variant를 저장하기 전에 현재 variant를 업데이트
    setVariant(newVariant);
    // 이전 variant 업데이트
    prevVariantRef.current = newVariant === "비밀번호" ? "아이디" : "비밀번호";
  };

  const VariantSelector = () => {
    return (
      <VariantWrapper>
        <VariantBox>
          <VariantBoxItem
            active={variant === "아이디"}
            onClick={() => handleClick("아이디")}
          >
            아이디 찾기
          </VariantBoxItem>
          <VariantBoxItem
            active={variant === "비밀번호"}
            onClick={() => handleClick("비밀번호")}
          >
            비밀번호 찾기
          </VariantBoxItem>
        </VariantBox>
        <VariantNoticeBar
          variant={variant}
          prevVariant={prevVariantRef.current} // useRef로 저장한 이전 variant 사용
          isDarkMode={isDarkMode}
        />
      </VariantWrapper>
    );
  };
  return { VariantSelector, variant };
};

export default useVariantSelector;

const VariantWrapper = styled.div`
  width: 100%;
`;

const VariantBox = styled.div`
  font-size: 16px;
  width: 100%;
  display: flex;
`;

const VariantBoxItem = styled.div<{ active: boolean }>`
  width: 50%;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  font-weight: 400;

  ${(props) =>
    props.active &&
    css`
      font-weight: 600;
    `};
`;

const VariantNoticeBar = styled.div<{
  variant: Variant;
  prevVariant: Variant;
  isDarkMode: boolean;
}>`
  width: 50%;
  height: 0.3rem;
  background-color: ${(props) =>
    props.isDarkMode ? props.theme.lightYellow : props.theme.yellow};
  border-radius: 999rem;

  animation: ${(props) =>
    props.variant === "아이디" && props.prevVariant === "비밀번호"
      ? "slide-left 0.3s forwards"
      : props.variant === "비밀번호" && props.prevVariant === "아이디"
      ? "slide-right 0.3s forwards"
      : "none"};

  @keyframes slide-left {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes slide-right {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(100%);
    }
  }
`;
