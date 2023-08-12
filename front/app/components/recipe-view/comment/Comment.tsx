import styled from "styled-components";
import Image from "next/image";
import { Comments, User } from "@/app/types";
import { useSetRecoilState } from "recoil";
import authModalAtom from "@/app/store/modalAtom";

import SubTitle from "../../UI/SubTitle";
import RecipeComments from "./RecipeCommentList";
import RecipeCommentInput from "./RecipeCommentInput";

interface CommentProps {
  currentUser: User;
  comments: Comments[];
  recipe_id: string;
}

const Comment = ({ currentUser, comments, recipe_id }: CommentProps) => {
  const setIsAuthModal = useSetRecoilState(authModalAtom);

  // 댓글 개수
  const commentCount =
    Array.isArray(comments) && comments.length > 0 ? comments.length : 0;

  const authConfirmHandler = () => {
    if (!currentUser) {
      setIsAuthModal(true);
    }
  };

  return (
    <div>
      <SubTitle>
        댓글
        <CommentIcon>
          <Image
            src="/images/recipe-view/comment.svg"
            alt="댓글 아이콘"
            width={22}
            height={22}
          ></Image>
        </CommentIcon>
        {commentCount}
      </SubTitle>
      <RecipeComments comments={comments} />
      <div onClick={authConfirmHandler}>
        <RecipeCommentInput recipe_id={recipe_id} />
      </div>
    </div>
  );
};

export default Comment;

/** 댓글 아이콘 Div */
const CommentIcon = styled.div`
  margin-left: 0.5rem;
  margin-right: 0.2rem;
  margin-top: 0.1rem;

  @media (min-width: 1024px) {
    margin-top: 0.3rem;
  }
`;
