"use client";

import { useEffect, useState } from "react";

const useMediaQuery = () => {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mediaQuery.matches); // 초기 렌더링 시 미디어 쿼리 결과에 따라 상태를 설정

    const handleResize = () => {
      setIsDesktop(mediaQuery.matches); // 화면 크기 변경 시 미디어 쿼리 결과에 따라 상태를 업데이트
    };

    mediaQuery.addListener(handleResize); // 화면 크기 변경 이벤트 리스너 등록

    return () => {
      mediaQuery.removeListener(handleResize); // 컴포넌트 언마운트 시 이벤트 리스너 제거
    };
  }, []);

  return isDesktop;
};

export default useMediaQuery;
