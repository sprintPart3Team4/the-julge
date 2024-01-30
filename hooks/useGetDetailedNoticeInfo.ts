import { useEffect, useState } from "react";
import axios from "axios";
import getCookies from "@/lib/getCookies";

export default function useGetDetailedNoticeInfo(noticeId: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState({});

  const getDetailedNoticeInfo = async () => {
    const { shopId } = getCookies();

    try {
      const res = await axios.get(`shops/${shopId}/notices/${noticeId}`);
      setData(res.data);
    } catch (error) {
      if (!shopId) setError("존재하지 않는 가게입니다");
      else setError("존재하지 않는 공고입니다");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDetailedNoticeInfo();
    console.log(data);
  }, [isLoading]);

  return [isLoading, error, data];
}
