import { useEffect } from "react";
import instance from "@/pages/api/axios";
import getCookies from "@/lib/getCookies";

export default function useReloadNotice() {
  const reloadData = async function () {
    const { token, shopId, noticeId } = getCookies();

    const res = await instance.get(`shops/${shopId}/notices/${noticeId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = res.data.item;

    const reload: {
      getHourlyPay: number;
      getStartsAt: string;
      getWorkhour: number;
      getDescription: string;
    } = {
      getHourlyPay: data.hourlyPay,
      getStartsAt: data.startsAt,
      getWorkhour: data.workhour,
      getDescription: data.description,
    };

    console.log("공고 조회 완료");

    return reload;
  };

  return reloadData();
}
