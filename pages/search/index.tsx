import React from "react";
import Notices from "@/components/Notices/Notices";
import { useRouter } from "next/router";
import Footer from "@/components/common/footer/Footer";

export default function SearchPage() {
  const router = useRouter();
  const { keyword } = router.query;

  if (typeof keyword !== "string") return;

  return (
    <>
      <Notices keyword={keyword} />
      <Footer />
    </>
  );
}
