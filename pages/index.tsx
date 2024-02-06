import { useEffect, useState } from "react";
import NavBar from "@/components/common/navBar/NavBar";
import NoticeListLayout from "@/components/noticeList/noticeListLayout/NoticeListLayout";
import { Notices, NoticeList } from "@/lib/getNotices";

export default function Home() {
  const [keyword, setKeyword] = useState<string>("");
  const [notices, setNotices] = useState<Notices>();
  const [isLoading, setIsLoading] = useState(true);
  const [noticeList, setNoticeList] = useState<NoticeList>([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setNoticeList(noticeList);
  }, [keyword]);

  return (
    <>
      {/* <NavBar /> */}
      <NoticeListLayout keyword={keyword} noticeList={noticeList} />
    </>
  );
}
