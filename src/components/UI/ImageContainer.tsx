"use client";

import Image from "next/image";
import styled from "styled-components";

interface ImageContainerProps {
  imageUrl: string;
  aspectRatio?: number;
  sizes?: string;
}

const ImageContainer = ({
  imageUrl,
  aspectRatio = 1,
  sizes = "240",
}: ImageContainerProps) => {
  return (
    <RecipeImgContainer aspectRatio={aspectRatio}>
      <RecipeImgWrapper>
        <Image
          fill
          sizes={sizes}
          src={imageUrl}
          style={{ objectFit: "cover", backgroundColor: "#f5f5f5" }}
          placeholder="empty"
          alt="게시물 썸네일 이미지"
        />
      </RecipeImgWrapper>
    </RecipeImgContainer>
  );
};

export default ImageContainer;

const RecipeImgContainer = styled.div<{ aspectRatio: number }>`
  position: relative;
  padding-top: ${({ aspectRatio }) => aspectRatio && `${aspectRatio * 100}%`};
  border-radius: 0.8rem;
  overflow: hidden;
`;

const RecipeImgWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
  object-fit: cover;
  border-radius: 0.8rem;

  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;
