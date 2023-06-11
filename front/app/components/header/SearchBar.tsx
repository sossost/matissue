"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import styled from "styled-components";

const SearchBar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const searchSubmitHandler: React.KeyboardEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (e.key === "Enter") {
      router.push(`/recipes/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <SearchBarDiv>
      <div>
        <Image
          src="/images/searchIcon.svg"
          width={18}
          height={18}
          alt="searchIcon"
        />
      </div>
      <SearchBarInput
        onKeyUp={searchSubmitHandler}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchQuery(e.target.value)
        }
      />
    </SearchBarDiv>
  );
};

const SearchBarDiv = styled.div`
  display: none;
  align-items: center;
  padding: 0.8rem 1.6rem;
  height: 4rem;
  flex-grow: 1;
  gap: 1.6rem;
  max-width: 36rem;

  border: 0.1rem solid rgb(200, 200, 200);
  border-radius: 0.8rem;

  &:focus-within {
    border: 0.1rem solid #fbd26a;
    box-shadow: inset 0 0 0.1rem 0.2rem #fbd26a;
  }

  @media (min-width: 1024px) {
    display: flex;
    position: absolute;
    width: 36rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10rem;
  }
`;

const SearchBarInput = styled.input`
  width: 100%;
  border: none;
  font-size: 16px;
  font-weight: 400;
  &:focus {
    outline: none;
  }
`;

export default SearchBar;
