import { useRouter } from "next/router";
import React from "react";

export default function SearchPage() {
  const router = useRouter();
  const { keyword } = router.query;

  if (typeof keyword !== "string") return;

  return keyword ? <h1>검색 결과</h1> : <h1>search 페이지</h1>;
}
