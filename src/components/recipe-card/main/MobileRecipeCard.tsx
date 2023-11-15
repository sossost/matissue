import Image from "next/image";
import Link from "next/link";
import tw from "tailwind-styled-components";
import { Recipe } from "@/src/types";

/** 메인 레시피 카드 */
const MobileRecipeCard = ({ recipe }: { recipe: Recipe }) => {
  return (
    <>
      <RecipeCardWrapper href={`/recipe/${recipe.recipe_id}`}>
        <RecipeImg>
          <ImgWrapper>
            <Image
              fill
              style={{ objectFit: "cover" }}
              src={recipe.recipe_thumbnail}
              alt="게시물 썸네일 이미지"
              sizes="200"
            />
          </ImgWrapper>
        </RecipeImg>

        <RecipeTitle>{recipe.recipe_title}</RecipeTitle>
        <RecipeInfo>
          <RecipeAuthor>
            <p>{recipe.user_nickname}</p>
          </RecipeAuthor>
          <RecipeRank>
            <RecipeRankItem>
              <RecipeRankImg>
                <Image
                  src="/images/recipe-view/heart_full.svg"
                  alt="게시물 좋아요 이미지"
                  width={30}
                  height={26}
                />
              </RecipeRankImg>
              <HeartCount>
                {recipe.recipe_like.length.toLocaleString()}
              </HeartCount>
            </RecipeRankItem>
            <RecipeRankItem>
              <RecipeRankImg style={{ marginBottom: "0.25rem" }}>
                <Image
                  src="/images/recipe-view/comment.svg"
                  alt="게시물 댓글 이미지"
                  width={30}
                  height={26}
                />
              </RecipeRankImg>
              <Count>{recipe.comments.length.toLocaleString()}</Count>
            </RecipeRankItem>
          </RecipeRank>
        </RecipeInfo>
      </RecipeCardWrapper>
    </>
  );
};

export default MobileRecipeCard;

const RecipeCardWrapper = tw(Link)`
  flex
  flex-col
  w-full
  min-w-[200px]
  gap-[2px]
  cursor-pointer
`;

const RecipeImg = tw.div`
  relative
  pt-[90%]
  rounded-[8px]
  overflow-hidden
`;

const ImgWrapper = tw.div`
  absolute
  w-full
  h-full
  inset-0
  object-cover
  rounded-[8px]
  transition-transform
  duration-300 
  ease-in-out 
  
  hover:scale-110
`;

const RecipeInfo = tw.div`
  flex
  justify-between
  w-full

  sm:m-0
`;

const RecipeTitle = tw.div`
  w-full
  text-[16px]
  font-medium
  leading-[20px]
  mt-1
  truncate
`;

const RecipeAuthor = tw.div`
  text-[14px]
  font-regular
  color-[#6f6f6f]
`;

const RecipeRank = tw.div`
  flex
`;

const RecipeRankItem = tw.div`
  flex
  items-center
  text-center
  text-[12px]
  font-regular
  ml-[10px]
`;

const RecipeRankImg = tw.div`
  mr-[5px]
  max-w-[13px]
  max-h-[11px]
`;

const HeartCount = tw.span`
  text-[14px]
  mr-1/2
`;

const Count = tw.span`
  text-[14px]
  mr-1/2
`;
