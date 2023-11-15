"use client";

import tw from "tailwind-styled-components";
import darkModeAtom from "@/src/store/darkModeAtom";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import Link from "next/link";

const Logo = () => {
  const isDarkMode = useRecoilValue(darkModeAtom);

  return (
    <LogoWrapper href="/">
      <Image
        src={isDarkMode ? "/logoDarkMode.svg" : "/logo.svg"}
        fill
        sizes="120"
        alt="Logo"
      />
    </LogoWrapper>
  );
};

const LogoWrapper = tw(Link)`
  block
  relative
  w-[105px]
  h-[35px]

  lg:w-[120px]
  lg:h-[40px]
`;

export default Logo;
