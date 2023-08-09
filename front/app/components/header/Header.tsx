"use client";

import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import darkModeAtom from "@/app/store/darkModeAtom";
import getCurrentUser from "@/app/api/user";
import useMovingContentByScrolling from "@/app/hooks/useMovingContentByScrolling";
import { User } from "@/app/types";
import { useRecoilValue } from "recoil";

import Logo from "./Logo";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import CategoryBar from "./CategoryBar";
import HamburgerBtn from "./mobile/HamburgerBtn";
import SearchBtn from "./mobile/SearchBtn";
import DarkmodeBtn from "./DarkModeBtn";

const Header = ({ initialCurrentUser }: { initialCurrentUser: User }) => {
  // 레시피 조회페이지일 경우, 스크롤 감지하여 헤더를 숨기는 커스텀훅
  const isHeaderVisible = useMovingContentByScrolling();
  const isDarkMode = useRecoilValue(darkModeAtom);

  // 로그인된 유저정보를 받아옴
  const { data: currentUser, isLoading } = useQuery<User>(
    ["currentUser"],
    () => getCurrentUser(),
    {
      refetchOnWindowFocus: false,
      retry: 0,
      // 서버사이드에서 미리 받아온 유저정보를 기본값으로 넣어서 새로고침시 유저메뉴 바로띄움
      initialData: initialCurrentUser,
      // 5분마다 유저정보를 요청해서 세션만료시 로그아웃
      refetchInterval: 300000,
    }
  );

  return (
    <HeaderLayout isHeaderVisible={isHeaderVisible} isDarkMode={isDarkMode}>
      <HeaderContainer>
        <TopNavBar>
          <HamburgerBtn currentUser={currentUser} />
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
          <SearchBar />
          <ButtonsWrapper>
            <DarkmodeBtn isMobile={false} />
            {isLoading ? null : <UserMenu currentUser={currentUser} />}
          </ButtonsWrapper>
          <SearchBtn />
        </TopNavBar>
        <CategoryBar />
      </HeaderContainer>
      <UnderLine />
    </HeaderLayout>
  );
};

export default Header;

const HeaderLayout = styled.div<{
  isHeaderVisible: boolean;
  isDarkMode: boolean;
}>`
  position: fixed;
  width: 100%;
  background-color: ${(props) =>
    props.isDarkMode ? props.theme.deepNavy : "#fff"};
  z-index: 9990;
  font-size: 16px;
  }

  transform: ${(props) =>
    props.isHeaderVisible ? "translateY(0)" : "translateY(-100%)"};
  transition: transform 0.3s ease-in-out;
`;

const HeaderContainer = styled.div`
  padding: 0 2rem;
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
`;

const TopNavBar = styled.div`
  position: relative;
  display: flex;
  height: 7rem;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;

  @media (min-width: 1024px) {
    height: 8rem;
  }
`;

const UnderLine = styled.div`
  display: block;
  border-bottom: 0.1rem solid rgb(200, 200, 200);
`;

const LogoWrapper = styled.div`
  @media (max-width: 1023.9px) {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;
`;
