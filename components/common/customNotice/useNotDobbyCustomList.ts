import instance from "@/lib/axiosInstance";

export default async function useNotDobbyCustomList(setCustomNoticeList: any) {
  const res = await instance.get(`notices?sort=time`);
  const noticeList = res.data.items;
  setCustomNoticeList(noticeList);
}