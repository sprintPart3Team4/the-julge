import NavBar from "@/components/common/navBar/NavBar";
import NoticeList from "@/components/noticeList/NoticeList";
import { Notices, getNotices } from "@/lib/getNotices";
import { useEffect, useState } from "react";

export default function Home() {
  const [keyword, setKeyword] = useState<string>("");
  const [notices, setNotices] = useState<Notices>();

  const fetchNotices = async () => {
    const data = await getNotices(0, 30, keyword);
    setNotices(data);
  };

  useEffect(() => {
    fetchNotices();
    console.log(notices?.items);
  }, [keyword]);

  return (
    <>
      <NavBar setKeyword={setKeyword} />
      <NoticeList keyword={keyword} />
    </>
  );
}
