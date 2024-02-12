import React from "react";
import { useRouter } from "next/router";
import Notices from "@/components/Notices/Notices";
import NavBar from "@/components/common/navBar/NavBar";
import Footer from "@/components/common/footer/Footer";

export default function SearchPage() {
  const router = useRouter();
  const { keyword } = router.query;

  if (typeof keyword !== "string") return;

  return (
    <>
      <NavBar />
      <Notices keyword={keyword} />
      <Footer />
    </>
  );
}
