import { useEffect, useState } from "react";
import axios from "axios";
import getCookies from "@/lib/getCookies";

export default function useGetNoticeList() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState({});

  const getNoticeList = async () => {
    const { shopId } = getCookies();
    try {
      const res = await axios.get(`shops/${shopId}/notices`);
      setData(res.data);
    } catch (error) {
      setError("존재하지 않는 가게입니다");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getNoticeList();
  }, [isLoading]);

  return [isLoading, error, data];
}
