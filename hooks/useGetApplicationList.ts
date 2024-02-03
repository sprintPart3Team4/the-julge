import { useEffect, useState } from "react";
import instance from "@/lib/axiosInstance";
import getCookies from "@/lib/getCookies";

export default function useGetApplicationList(noticeId: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState({});

  const getApplicationList = async () => {
    const { shopId } = getCookies();
    try {
      const res = await instance.get(`shops/${shopId}/notices/${noticeId}/applications`);
      setData(res.data);
    } catch (error) {
      setError("404 not found");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getApplicationList();
    console.log(data);
  }, [isLoading]);

  return [isLoading, error, data];
}
