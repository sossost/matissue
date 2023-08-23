"use client";

import ConfirmModal from "@/src/components/auth/ConfirmModal";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useEmailSentModal = () => {
  const [message, setMessage] = useState<string>("");

  const router = useRouter();

  const EmailSentModal = () => {
    return (
      <ConfirmModal
        onConfirm={() => {
          router.replace("/auth/login");
        }}
        onClose={() => {
          setMessage("");
        }}
        btnValue="로그인 하기"
        message={message}
      />
    );
  };

  return { message, setMessage, EmailSentModal };
};

export default useEmailSentModal;
