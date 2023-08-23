import styled from "styled-components";
import Image from "next/image";
import { getChefByUserId } from "@/src/app/api/user";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { axiosBase } from "@/src/app/api/axios";
import { AlertImage } from "@/src/styles/my-page/modify-user-info.style";
import FollowDeleteModal from "../../UI/FollowDeleteModal";
import { useRouter } from "next/navigation";
import LoginConfirmModal from "../../UI/LoginConfirmModal";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type WriterProfileProps = {
  user_id: string;
  loggedInUserId: string | undefined;
};

/** 작성자 프로필 컴포넌트 */
const MiniWriterProfile = ({ user_id, loggedInUserId }: WriterProfileProps) => {
  // currentChef에 user 정보가 담김
  const { data: currentChef, isLoading } = useQuery(
    ["currentChef", user_id],
    () => getChefByUserId(user_id)
  );

  const client = useQueryClient();
  const [isFollowing, setIsFollowing] = useState(false);

  // 로그인 유도 모달 상태 관리
  const [loginConfirmModal, setLoginConfirmModal] = useState(false);

  // userid => 닉네임, 팔로잉, 팔로워, 프로필 사진 받아오는 API
  // 로그인한 유저가 페이지 처음 로드 시 팔로우 여부 판단 의존성 설정
  useEffect(() => {
    if (loggedInUserId !== undefined) {
      const fans = currentChef?.fans;
      const isFollowing = fans?.includes(loggedInUserId);
      setIsFollowing(isFollowing);
    }
  }, [loggedInUserId]);

  const followButtonText =
    loggedInUserId === user_id
      ? "언제나 팔로잉"
      : isFollowing
      ? "팔로잉"
      : "팔로우";

  // 팔로우 취소 모달 상태 관리
  const [followDeleteConfirmModal, setFollowDeleteConfirmModal] =
    useState(false);

  /** 팔로우 버튼 클릭 핸들러 */
  const followButtonHandler = async () => {
    try {
      // 작성자가 자신의 게시글을 보는 경우
      if (loggedInUserId === user_id) {
        toast.success(`소중한 당신을 언제나 응원해요!`);
      }
      // 로그인되지 않은 유저가 팔로우 요청하는 경우
      else if (loggedInUserId === undefined) {
        setLoginConfirmModal(!loginConfirmModal);
      }
      // 작성자와 다른 로그인 유저가 팔로우 요청하는 경우
      else {
        // 이미 팔로우를 한 경우
        if (isFollowing === true) {
          // 팔로우 취소 모달창 띄워줌
          setFollowDeleteConfirmModal(true);
        }
        // 로그인된 유저가 팔로우 요청 하는 경우
        else {
          try {
            const response = await axiosBase.post(
              `/users/subscription/${user_id}?subscribe=true`
            );
            toast.success("팔로우가 완료되었습니다!");
            // 요청 성공 시 query key를 무효화해서 현재 작성자 데이터 최신화
            client.invalidateQueries(["currentChef", user_id]);

            // 팔로우 -> 팔로잉으로 변경
            setIsFollowing(true);
          } catch (error) {
            console.log("팔로우 요청 실패와 관련한 오류는..🧐", error);
            toast.error("팔로우 요청에 실패했습니다 ㅠ.ㅠ");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  /** 팔로우 취소 모달 : 확인 클릭 핸들러 */
  const deleteConfirmHandler = async () => {
    try {
      const res = await axiosBase.post(
        `/users/subscription/${user_id}?subscribe=false`
      );

      // 요청 성공 시 query key를 무효화해서 현재 작성자 데이터 최신화
      client.invalidateQueries(["currentChef", user_id]);

      toast.success("팔로우가 취소되었습니다!");
    } catch (error) {
      console.log("팔로우 취소 실패와 관련한 오류는..🧐", error);
      toast.error("팔로우 취소에 실패했습니다 ㅠ.ㅠ");
    } finally {
      // 팔로우 -> 팔로잉으로 변경
      setIsFollowing(false);
      // 모달창 닫기
      setFollowDeleteConfirmModal(false);
    }
  };

  /** 팔로우 취소 모달 : 취소 클릭 핸들러 */
  const confirmModalCloseHandler = () => {
    setFollowDeleteConfirmModal(false);
  };

  /** 로그인 유도 모달 : 취소 클릭 핸들러 */
  const loginModalCloseHandler = () => {
    setLoginConfirmModal(false);
  };

  /** 로그인 유도 모달 : 로그인 클릭 핸들러 */
  const router = useRouter();
  const loginMoveHandler = () => {
    router.push("auth/login");
  };

  /** 프로필 클릭 핸들러 - 유저 페이지로 이동 */
  const profileClickHandler = () => {
    router.push(`user/${currentChef.user_id}`);
  };

  // currentChef를 받아오기 전 로딩 상태를 표시하는 컴포넌트
  if (isLoading) {
    return <div>Loading...</div>; //
  }

  return (
    <>
      {/* 팔로우 취소 모달 */}
      {followDeleteConfirmModal && (
        <StyledConfirmModal
          icon={<AlertImage src="/images/orange_alert.svg" alt="alert" />}
          message="팔로우를 취소하시겠습니까?"
          onConfirm={deleteConfirmHandler}
          onCancel={confirmModalCloseHandler}
        />
      )}

      {/* 비회원 로그인 유도 모달 */}
      {loginConfirmModal && loggedInUserId === undefined && (
        <StyledLoginConfirmModal
          icon={<AlertImage src="/images/orange_alert.svg" alt="alert" />}
          message="로그인이 필요합니다. 로그인 하시겠습니까?"
          onConfirm={loginMoveHandler}
          onCancel={loginModalCloseHandler}
        />
      )}
      <ProfileContainer>
        <ProfileHeader>오늘의 쉐프</ProfileHeader>
        <ProfileContentsWrapper>
          <UserProfileClickWrapper onClick={profileClickHandler}>
            {/* 프로필 사진 */}
            <ProfileImage>
              <Image
                src={
                  currentChef.img
                    ? currentChef.img
                    : "/images/recipe-view/기본 프로필.PNG"
                }
                alt="게시글 작성자 프로필 사진"
                width={130}
                height={130}
                style={{ objectFit: "cover", cursor: "pointer" }}
              />
            </ProfileImage>

            {/* 닉네임 */}
            <Nickname>{currentChef?.username}</Nickname>

            {/* 팔로잉, 팔로워 */}
            <FollowBox>
              <span>팔로워</span>
              <BoldCount>{currentChef?.fans.length}</BoldCount>
              <span>|</span>
              <span>팔로잉</span>
              <BoldCount>{currentChef?.subscriptions.length}</BoldCount>
            </FollowBox>

            {/* 팔로우 버튼 */}
            <FollowButton onClick={followButtonHandler}>
              {followButtonText}
            </FollowButton>
          </UserProfileClickWrapper>
        </ProfileContentsWrapper>
      </ProfileContainer>
    </>
  );
};

/** 프로필 박스 전체 감싸는 Div */
const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 18.5rem;
    height: 32rem;
    right: 3rem;
    bottom: 10rem;
    box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.3);
    border-radius: 2rem;
    background-color: #ffffff;
    z-index: 30;

    
    }

  @media (min-width: 1024px) {
    display: none;
`;

/** 클릭 시 유저 페이지로 이동하는 영역 Div */
const UserProfileClickWrapper = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/** 프로필 헤더 박스 Div */
const ProfileHeader = styled.div`
  width: 18.5rem;
  height: 4.3rem;
  background: #fbe2a1;
  border-radius: 20px 20px 0px 0px;
  font-weight: 500;
  font-size: 17px;
  color: #4f3d21;
  padding: 1rem;
  padding-left: 1.5rem;
`;

/** 프로필 내용 담는 Div */
const ProfileContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.9rem;
`;

/** 프로필 이미지 감싸는 Div */
const ProfileImage = styled.div`
  display: flex;
  width: 12rem;
  height: 12rem;
  margin-bottom: 1.3rem;
  box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  overflow: hidden;
`;

/** 닉네임 Span */
const Nickname = styled.span`
  font-size: 1.8rem;
  font-weight: 500;
  color: #4f3d21;
  margin-bottom: 0.4rem;
`;

/** 팔로잉, 팔로워 Div */
const FollowBox = styled.div`
  display: flex;
  color: #4f3d21;
  font-size: 1.5rem;
  gap: 0.3rem;
  margin-bottom: 1.65rem;
`;

/** 팔로잉, 팔로워수 강조 Span */
const BoldCount = styled.span`
  font-weight: 500;
`;

/** 팔로우 버튼 */
const FollowButton = styled.button`
  width: 14rem;
  height: 3.5rem;
  font-size: 16px;
  font-weight: 500;
  background-color: #fbe2a1;
  color: #4f3d21;
  border-radius: 1rem;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #fbd26a;
  }
`;

/** 팔로우 취소 컨펌 모달창 */
const StyledConfirmModal = styled(FollowDeleteModal)``;

/** 로그인 유도 모달창 */
const StyledLoginConfirmModal = styled(LoginConfirmModal)``;

export default MiniWriterProfile;
