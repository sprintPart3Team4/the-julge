import { useEffect, useState } from "react";
import instance from "@/lib/axiosInstance";
import getCookies from "@/lib/getCookies";

export default function useChangeStatus(noticeId: string, application_id: string, status: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState({});

  const changeStatus = async () => {
    const { shopId, token } = getCookies();
    try {
      const res = await instance.put(
        `shops/${shopId}/notices/${noticeId}/applications/${application_id}`,
        {
          status: status,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setData(res.data);
    } catch (error) {
      setError("존재하지 않는 가게입니다");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    changeStatus();
    console.log(data);
  }, [isLoading]);

  return [isLoading, error, data];
}
