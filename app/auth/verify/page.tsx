"use client";

import { verifyEmail } from "@/app/api/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const VerifyEmail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const verifyCode = searchParams?.get("code");

  useEffect(() => {
    const verify = async () => {
      if (verifyCode) {
        try {
          await verifyEmail(verifyCode);
          toast.success("가입이 완료되었습니다.");
        } catch (error: any) {
          toast.error(error.reponse.data.detail);
        } finally {
          router.replace("/");
        }
      }
    };
    verify();
  }, []);

  return <></>;
};

export default VerifyEmail;
