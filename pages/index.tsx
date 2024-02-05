import NavBar from "@/components/common/navBar/NavBar";
import { Notices, getNotices } from "@/lib/getNotices";
import { useEffect, useState } from "react";

export default function Home() {
  const [keyword, setKeyword] = useState<string>("");
  const [notices, setNotices] = useState<Notices>();

  const fetchNotices = async () => {
    const data = await getNotices(0, 5, keyword);
    setNotices(data);
  };

  useEffect(() => {
    fetchNotices();
  }, [keyword]);

  return (
    <>
      <NavBar setKeyword={setKeyword} />
      <p>키워드: {keyword}</p>
      <p>검색결과: {JSON.stringify(notices)}</p>
    </>
  );
}
