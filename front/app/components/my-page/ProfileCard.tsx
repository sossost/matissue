"use client";
import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import Button from "../../components/UI/Button";
import { useQuery } from "@tanstack/react-query";
import { Recipe, User } from "@/app/types";

type ProfileCardProps = {
  currentUser: User;
  recipes?: Recipe[];
};

const ProfileCard: React.FC<ProfileCardProps> = ({ currentUser }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // const { data: currentUser } = useQuery<User>(["currentUser"]);
  // console.log("currentUser : ", currentUser.);
  return (
    <ProfileContainer>
      <ProfileWrapper>
        <Link href="/my-page/notification">
          <NotificationIcon src="/images/notification.png" alt="알림 아이콘" />
          <NotificationDot />
        </Link>

        <RoundImage>
          <ProfileImage
            src={currentUser?.img || "images/dongs-logo.png"}
            alt="profile-image"
          />
        </RoundImage>
        <NickName>{currentUser?.username}</NickName>
        <Link href="/my-page/modify-user-info">
          <ModifyUserButton>
            <Button
              isBorderColor={true}
              fullWidth={true}
              fullHeight={true}
              isSmallFont={true}
              isHoverColor={true}
            >
              회원정보수정
            </Button>
          </ModifyUserButton>
        </Link>
        <Divider />
        <StyledLink href="/my-page">
          <MyRecipeIcon src="/images/recipe-icon.png" alt="레시피 아이콘" />
          <MyRecipeTitle>나의 레시피</MyRecipeTitle>
          <MyRecipeCount>{recipes.length}</MyRecipeCount>
        </StyledLink>
        <Link href="/add-recipe">
          <UploadRecipeButton>
            <Button
              type="button"
              isBgColor={true}
              fullWidth={true}
              isBorderColor={false}
              isHoverColor={false}
            >
              레시피 올리기
            </Button>
          </UploadRecipeButton>
        </Link>
      </ProfileWrapper>
    </ProfileContainer>
  );
};

export default ProfileCard;

const ProfileContainer = styled.div`
  border: 0.1rem solid rgb(200, 200, 200);
  border-radius: 2.3rem;
  box-shadow: rgba(63, 71, 77, 0.06) 0px 0.2rem 0.4rem 0px;
  border-radius: 2.3rem;
  height: 47rem;
  margin-right: 4rem;
`;

const ProfileWrapper = styled.div`
  position: relative;
  padding: 3rem 2.5rem 1.8rem;
  width: 26.8rem;
  height: 47.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NotificationIcon = styled.img`
  position: absolute;
  top: 2rem;
  right: 2.1rem;
  width: 1.95rem;
  height: 2.2rem;
  color: #4f3d21;
`;

const NotificationDot = styled.div`
  position: absolute;
  top: 2.265rem;
  right: 2.265rem;
  width: 0.5rem;
  height: 0.5rem;
  background-color: #fe642e;
  border-radius: 50%;
`;

const RoundImage = styled.div`
  width: 12rem;
  height: 12rem;
  border-radius: 50%;
  overflow: hidden;
`;

const ProfileImage = styled.img`
  width: 100%
  height: 100%
  object-fit: cover;
  background-color: #fff9ea;
`;

const NickName = styled.h1`
  font-size: 26px;
  font-weight: 700;
  margin: 1rem;
  color: #4f3d21;
`;

const ModifyUserButton = styled.div`
  width: 10rem;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin: 2rem 0;
`;

const StyledLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MyRecipeIcon = styled.img`
  width: 2.8rem;
  height: 2.8rem;
`;

const MyRecipeTitle = styled.h4`
  margin-top: 0.4rem;
  font-size: 15px;
  font-weight: 500;
  color: #4f3d21;
`;

const MyRecipeCount = styled.h4`
  margin-top: 0.4rem;
  font-size: 17px;
  font-weight: 700;
  color: #4f3d21;
`;

const UploadRecipeButton = styled.div`
  margin-top: 1.8rem;
  width: 14rem;
`;
