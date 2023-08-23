"use client";

import { useRouter } from "next/navigation";
import { AlertImage } from "../styles/my-page/modify-user-info.style";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import authModalAtom from "../store/modalAtom";

import LoginConfirmModal from "../components/UI/LoginConfirmModal";

const ModalContext = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isModal, setIsModal] = useRecoilState(authModalAtom);

  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isModal]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {isModal && (
        <LoginConfirmModal
          icon={<AlertImage src="/images/orange_alert.svg" alt="alert" />}
          message="로그인이 필요합니다. 로그인 하시겠습니까?"
          onConfirm={() => router.push("auth/login")}
          onCancel={() => setIsModal(false)}
        />
      )}
    </>
  );
};

export default ModalContext;
