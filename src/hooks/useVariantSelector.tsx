"use client";

import { useState, useRef, useCallback } from "react";
import { useRecoilValue } from "recoil";
import styled, { css } from "styled-components";
import darkModeAtom from "../store/darkModeAtom";
import React from "react";

interface VariantSelectorProps<T extends string, U extends string> {
  variant1: T;
  variant2: U;
  initialVariant: T | U;
}

const useVariantSelector = <T extends string, U extends string>({
  variant1,
  variant2,
  initialVariant,
}: VariantSelectorProps<T, U>) => {
  const [selectedVariant, setSelectedVariant] = useState<T | U>(initialVariant);
  const prevVariantRef = useRef<T | U>(initialVariant); // useRef로 이전 variant 관리
  const isDarkMode = useRecoilValue(darkModeAtom);

  const handleClick = (newVariant: T | U) => {
    // 이전 variant를 저장하기 전에 현재 variant를 업데이트
    setSelectedVariant(newVariant);
    // 이전 variant 업데이트
    prevVariantRef.current = newVariant === variant2 ? variant1 : variant2;
  };

  // eslint-disable-next-line react/display-name
  const VariantSelector = useCallback(() => {
    return (
      <VariantWrapper>
        <VariantBox>
          <VariantBoxItem
            active={selectedVariant === variant1}
            onClick={() => handleClick(variant1)}
          >
            {variant1}
          </VariantBoxItem>
          <VariantBoxItem
            active={selectedVariant === variant2}
            onClick={() => handleClick(variant2)}
          >
            {variant2}
          </VariantBoxItem>
        </VariantBox>
        <VariantNoticeBar
          selectedVariant={selectedVariant}
          variant1={variant1}
          variant2={variant2}
          prevVariant={prevVariantRef.current} // useRef로 저장한 이전 variant 사용
          isDarkMode={isDarkMode}
        />
      </VariantWrapper>
    );
  }, [isDarkMode, selectedVariant]);
  return { VariantSelector, selectedVariant };
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
  isDarkMode: boolean;
  variant1: string;
  variant2: string;
  prevVariant: string;
  selectedVariant: string;
}>`
  width: 50%;
  height: 0.3rem;
  background-color: ${(props) =>
    props.isDarkMode ? props.theme.lightYellow : props.theme.yellow};
  border-radius: 999rem;

  animation: ${(props) =>
    props.selectedVariant === props.variant1 &&
    props.prevVariant === props.variant2
      ? "slide-left 0.3s forwards"
      : props.selectedVariant === props.variant2 &&
        props.prevVariant === props.variant1
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
