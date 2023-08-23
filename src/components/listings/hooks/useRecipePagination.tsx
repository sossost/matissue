import { Recipe } from "@/src/types";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";

interface UseRecipePaginationProps {
  recipesLength: number;
}

const useRecipePagination = ({ recipesLength }: UseRecipePaginationProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const contentsPerPage = 8;
  const totalPage = Math.ceil(recipesLength / contentsPerPage);

  // 페이지네이션 버튼 핸들러
  const leftBtnHandler = () => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
  };

  const rightBtnHandler = () => {
    if (currentPage >= totalPage) {
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  const handleSliceByPage = (recipes: Recipe[]) => {
    return recipes.slice(
      contentsPerPage * (currentPage - 1),
      contentsPerPage * currentPage
    );
  };

  const LeftSlideButton = () => {
    return (
      <LeftSlideBtn onClick={leftBtnHandler} currentPage={currentPage}>
        <Image
          src="/images/main/leftSlideBtn.png"
          alt="left_slice_btn"
          width={42}
          height={122}
        />
      </LeftSlideBtn>
    );
  };

  const RightSlideButton = () => {
    return (
      <RightSlideBtn
        onClick={rightBtnHandler}
        currentPage={currentPage}
        totalPage={totalPage}
      >
        <Image
          src="/images/main/rightSlideBtn.png"
          alt="right_slice_btn"
          width={42}
          height={122}
        />
      </RightSlideBtn>
    );
  };

  return {
    contentsPerPage,
    handleSliceByPage,
    LeftSlideButton,
    RightSlideButton,
  };
};

export default useRecipePagination;

const LeftSlideBtn = styled.button<{ currentPage: number }>`
  display: none;

  @media (min-width: 1024px) {
    ${(props) => (props.currentPage === 1 ? "display:none;" : "display:block;")}
    position: absolute;
    width: 3rem;
    height: 9rem;
    left: -3rem;
    transition: transform 0.3s;
    &:hover {
      transform: scale(130%, 130%);
    }
  }
`;

const RightSlideBtn = styled.button<{ currentPage: number; totalPage: number }>`
  display: none;

  @media (min-width: 1024px) {
    ${(props) =>
      props.currentPage > props.totalPage ? "display:none;" : "display:block;"}
    position: absolute;
    width: 3rem;
    height: 9rem;
    right: -3rem;
    transition: transform 0.3s;
    &:hover {
      transform: scale(130%, 130%);
    }
  }
`;
