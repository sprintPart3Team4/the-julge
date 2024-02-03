import { useEffect, useState } from "react";
import instance from "@/lib/axiosInstance";
import getCookies from "@/lib/getCookies";

export default function useGetShopInfo() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState({});

  const getShopInfo = async () => {
    const { shopId } = getCookies();
    try {
      const res = await instance.get(`shops/${shopId}`);
      setData(res.data.item);
    } catch (error) {
      setError("존재하지 않는 가게입니다");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getShopInfo();
    console.log(data);
  }, [isLoading]);

  return [isLoading, error, data];
}
