"use client";

import styled from "styled-components";
import Logo from "../header/Logo";
import { useRecoilValue } from "recoil";
import darkModeAtom from "@/src/store/darkModeAtom";
import Link from "next/link";

const Footer = () => {
  const isDarkMode = useRecoilValue(darkModeAtom);

  return (
    <FooterContainer isDarkMode={isDarkMode}>
      <FooterWrapper>
        <Logo />
        <FooterAllRightsReserved>
          이 프로젝트는 포트폴리오 목적으로 제작되었습니다. 상업적인 용도로
          사용하지 않을 것이며, 기존 사이트
          <Link
            href="https://wtable.co.kr/"
            style={{ fontSize: "16px", fontWeight: "bold", color: "blue" }}
          >
            (우리의 식탁)
          </Link>
          에서 자료를 가져와 활용하였습니다. 이 프로젝트의 목적은 개인적인
          학습과 기술 데모를 위한 것입니다. 원작자가 아닌 다른 소스로부터 자료를
          가져왔음을 밝힙니다.
        </FooterAllRightsReserved>
      </FooterWrapper>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div<{ isDarkMode: boolean }>`
  width: 100%;
  background-color: ${(props) =>
    props.isDarkMode ? props.theme.lightNavy : "#fbe2a1"};
`;

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.8rem;
  max-width: 120rem;
  width: 100%;
  padding: 2rem;
  margin: 0 auto;
  font-size: 10px;

  @media (min-width: 1024px) {
    font-size: 12px;
    padding: 4rem;
  }
`;

const FooterTextBox = styled.div`
  font-size: 12px;

  @media (min-width: 1024px) {
    font-size: 16px;
  }
`;

const FooterAllRightsReserved = styled.div`
  font-size: 10px;

  @media (min-width: 1024px) {
    font-size: 14px;
  }
`;
