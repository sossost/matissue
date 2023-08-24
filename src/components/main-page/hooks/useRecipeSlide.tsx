import { Recipe } from "@/src/types";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";

const useRecipeSlide = (recipeLength: number) => {
  const [slide, setSlide] = useState<number>(1);
  const totalSlide = recipeLength < 15 ? recipeLength / 3 : 5;

  /**  이전 페이지 버튼 핸들러 */
  const leftBtnHandler = () => {
    if (slide < 2) {
      return;
    }
    setSlide(slide - 1);
  };

  /** 다음 페이지 버튼 핸들러 */
  const rightBtnHandler = () => {
    if (slide >= totalSlide) {
      return;
    }
    setSlide(slide + 1);
  };

  /** 왼쪽 슬라이드 버튼 컴포넌트 */
  const LeftSlideButton = () => {
    return (
      <LeftSlideBtn onClick={leftBtnHandler} slide={slide}>
        <Image
          src="/images/main/GreenLeftSlideBtn.png"
          alt="left_button"
          fill
        />
      </LeftSlideBtn>
    );
  };

  /** 오른쪽 슬라이드 버튼 컴포넌트 */
  const RightSlideButton = () => {
    return (
      <RightSlideBtn
        onClick={rightBtnHandler}
        slide={slide}
        totalSlide={totalSlide}
      >
        <Image
          src="/images/main/GreenRightSlideBtn.png"
          alt="left_button"
          fill
        />
      </RightSlideBtn>
    );
  };

  return { slide, totalSlide, LeftSlideButton, RightSlideButton };
};

export default useRecipeSlide;

const LeftSlideBtn = styled.div<{ slide: number }>`
  display: none;

  @media (min-width: 1024px) {
    display: block;
    position: absolute;
    top: 24rem;
    cursor: pointer;
    height: 9.2rem;
    width: 2.8rem;

    transition: transform 0.3s;
    &:hover {
      transform: scale(120%);
    }

    ${(props) => props.slide < 2 && "display : none;"};
  }
`;

const RightSlideBtn = styled.div<{ slide: number; totalSlide: number }>`
  display: none;

  @media (min-width: 1024px) {
    display: block;
    position: absolute;
    top: 24rem;
    right: 0;
    cursor: pointer;
    height: 9.2rem;
    width: 3.128rem;

    transition: transform 0.3s;
    &:hover {
      transform: scale(120%);
    }

    ${(props) => props.slide >= props.totalSlide && "display : none;"};
  }
`;
