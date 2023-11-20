import styled, { keyframes } from "styled-components";

const LargeRecipeCardSkeleton = () => {
  return (
    <SkeletonSlideContainer>
      <SkeletonCardContainer>
        <SkeletonImageContainer />
        <SkeletonTextContainer>
          <SkeletonTitle />
          <SkeletonInfoBox>
            <SkeletonAuthor />
            <SkeletonIcons />
          </SkeletonInfoBox>
        </SkeletonTextContainer>
      </SkeletonCardContainer>
    </SkeletonSlideContainer>
  );
};

export default LargeRecipeCardSkeleton;

const loading = keyframes`
  0% {
    background-color: #e0e0e0;
  }
  50% {
    background-color: #f0f0f0;
  }
  100% {
    background-color: #e0e0e0;
  }
`;

const SkeletonSlideContainer = styled.div`
  overflow: hidden;
`;

const SkeletonCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #f0f0f0;
  border-radius: 1.6rem;
  cursor: pointer;
`;

const SkeletonImageContainer = styled.div`
  width: 100%;
  height: 280px;
  background-color: #e0e0e0;
  animation: ${loading} 1.5s infinite;
`;

const SkeletonTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1.6rem 1.6rem 2rem 1.6rem;
`;

const SkeletonTitle = styled.div`
  width: 80%;
  height: 22px;
  background-color: #e0e0e0;
  animation: ${loading} 1.5s infinite;
`;

const SkeletonInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const SkeletonAuthor = styled.div`
  width: 50%;
  height: 18px;
  background-color: #e0e0e0;
  animation: ${loading} 1.5s infinite;
`;

const SkeletonIcons = styled.div`
  width: 30%;
  height: 18px;
  background-color: #e0e0e0;
  animation: ${loading} 1.5s infinite;
`;
