// import React, { useEffect, useState } from "react";
import Image from "next/image";
import styled, { css } from "styled-components";
import BannerSearchBar from "./BannerSearchBar";
import tw from "tailwind-styled-components";
// import Link from "next/link";
// import { useWindow } from "@/src/hooks/useWindow";

const Banner = () => {
  // const [currentBannerIndex, setCurrentBannerIndex] = useState<number>(0); // 현재 배너 인덱스
  // const [translateValue, setTranslateValue] = useState<number>(0); // 현재 위치
  // const { windowWidth } = useWindow();
  // const sliderRef = React.useRef<HTMLDivElement>(null); // 배너 슬라이드 div
  // const bannerWrapperWidth = sliderRef.current
  //   ? sliderRef.current.offsetWidth
  //   : 0;

  // const slideChildLength = windowWidth >= 1024 ? 3 : 2;

  // /** 배너 인덱스 계산해서 다음 배너로 슬라이드해주는 함수 */
  // const slide = (currentBannerIndex: number) => {
  //   if (currentBannerIndex > slideChildLength - 2) {
  //     setCurrentBannerIndex(0);
  //   } else {
  //     setCurrentBannerIndex(currentBannerIndex + 1);
  //   }
  // };

  // useEffect(() => {
  //   if (currentBannerIndex === 0) {
  //     setTranslateValue(-bannerWrapperWidth * currentBannerIndex);
  //   }
  //   if (currentBannerIndex === 1) {
  //     setTranslateValue(-bannerWrapperWidth * currentBannerIndex);
  //   }
  //   if (currentBannerIndex === 2) {
  //     setTranslateValue(-bannerWrapperWidth * currentBannerIndex);
  //   }
  // }, [currentBannerIndex, bannerWrapperWidth]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     slide(currentBannerIndex);
  //   }, 8000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [currentBannerIndex]);

  return (
    <BannerContainer>
      <BannerWindow>
        <SliderContainer>
          {/* <Slider ref={sliderRef} translateValue={translateValue}> */}
          <BannerWrapper2>
            <SearchArea>
              <SearchTextContainer>
                <SearchTextWrapper>
                  대한민국 No.1 레시피 커뮤니티 맛이슈에서
                </SearchTextWrapper>
                <SearchTextWrapper>
                  찾으시는 레시피를 검색해보세요!
                </SearchTextWrapper>
              </SearchTextContainer>
              <BannerSearchBar />
            </SearchArea>
            <ImageArea>
              <ImageWrapper>
                <Image
                  src="/images/banner/bannerImage1.png"
                  alt="banner"
                  width={450}
                  height={280}
                />
              </ImageWrapper>
            </ImageArea>
          </BannerWrapper2>
          {/* <BannerWrapper>
              <Link href="/mbti">
                <Image
                  src="/images/banner/banner22.jpg"
                  width={1100}
                  height={400}
                  quality={100}
                  alt="banner2"
                />
              </Link>
            </BannerWrapper>
            <BannerWrapper>
              <Link href="/worldcup">
                <Image
                  src="/images/banner/banner33.jpg"
                  width={1100}
                  height={400}
                  quality={100}
                  alt="banner3"
                />
              </Link>
            </BannerWrapper> */}
          {/* </Slider> */}
        </SliderContainer>
        {/* <IndicatorWrapper>
          <IndicatorDot
            active={0 === currentBannerIndex}
            onClick={() => setCurrentBannerIndex(0)}
          />
          <IndicatorDot
            active={1 === currentBannerIndex}
            onClick={() => setCurrentBannerIndex(1)}
          />
          <IndicatorDot
            active={2 === currentBannerIndex}
            onClick={() => setCurrentBannerIndex(2)}
          />
        </IndicatorWrapper> */}
      </BannerWindow>
    </BannerContainer>
  );
};

export default Banner;

const BannerContainer = tw.div`
  block
  w-full
  pt-[15px]
  px-[15px]
  color-[#4f3d21]

  lg:p-0
  lg:rounded-none
  lg:w-min-[1024px]
  lg:h-[400px]
  lg:bg-[#ffea85]
  lg:mx-auto
`;

const BannerWindow = tw.div`
  relative
  w-full
  h-full
  w-max-[1200px]
  mx-auto
`;

const SliderContainer = tw.div`
  h-full
  overflow-hidden
`;

// const Slider = styled.div<{ translateValue: number }>`
//   display: flex;
//   ${({ translateValue }) =>
//     css`
//       transform: translateX(${translateValue}px);
//     `}
//   transition: transform 0.5s ease-in-out;
// `;

// const BannerWrapper = styled.div`
//   position: relative;
//   display: flex;
//   justify-content: center;
//   width: 100%;
//   height: 100%;
//   margin: 0 auto;
//   padding: 0;
//   overflow: hidden;
//   border-radius: 0.8rem;
//   flex: 0 0 100%;

//   @media (min-width: 1024px) {
//     padding: 0 2rem;
//   }
// `;

const BannerWrapper2 = tw.div`
  hidden

  lg:flex
  lg:py-5
  lg:justify-center
  lg:items-center
  lg:w-full
  lg:h-full
  lg:mx-auto
  lg:p-0
  lg:overflow-hidden
  lg:rounded-[8px]
  lg:relative
`;

const SearchArea = tw.div`
  flex
  flex-col
  p-5
  pb-20
  w-[45%]
`;

const SearchTextContainer = tw.div`
  py-5
  flex
  flex-col
  items-center
`;

const SearchTextWrapper = tw.div`
  text-[24px]
  font-semibold
`;

const ImageArea = tw.div`
  flex
  items-center
  py-12
  px-5
  w-1/2
  h-100
`;

const ImageWrapper = tw.div`
  flex
  object-contain
  relative
  w-[450px]
  h-[280px]
  right-0
`;

// const IndicatorWrapper = styled.div`
//   display: none;
//   @media (min-width: 1024px) {
//     display: block;
//     position: absolute;
//     bottom: 10px;
//     left: 50%;
//     transform: translateX(-50%);
//   }
// `;

// const IndicatorDot = styled.div<{ active: boolean }>`
//   display: inline-block;
//   width: 10px;
//   height: 10px;
//   border-radius: 50%;
//   margin: 0 5px;
//   cursor: pointer;
//   opacity: 0.7;

//   background-color: ${(props) => (props.active ? "#4F3D21" : "white")};
// `;
