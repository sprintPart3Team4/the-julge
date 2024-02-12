import instance from "@/lib/axiosInstance";

export default async function useNotDobbyCustomList(setCustomNoticeList: (arg: Array<any>) => void) {
  try {
    const customList = (await instance.get(`notices?sort=time`)).data.items;
    setCustomNoticeList(customList);
  } catch (error) {
    console.log("API 응답 오류 발생", error);
  }
}
