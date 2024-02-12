import instance from "@/lib/axiosInstance";

export default async function useNotDobbyCustomList(setCustomNoticeList: (arg: Array<any>) => void) {
  try {
    const noticeList = (await instance.get(`notices?sort=time`)).data.items;
    const customList = noticeList.filter((a: any) => a.item.closed === false);
    setCustomNoticeList(customList);
  } catch (error) {
    console.log("API 응답 오류 발생", error);
  }
}
