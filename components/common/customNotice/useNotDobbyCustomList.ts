import instance from "@/lib/axiosInstance";

export default async function useNotDobbyCustomList(setCustomNoticeList: any) {
  try {
    const res = await instance.get(`notices?sort=time`);
    const noticeList = res.data.items;
    console.log("API 응답 확인.")
    setCustomNoticeList(noticeList);
  } catch (error) {
    console.log("API 응답 오류 발생", error)
  }
}
