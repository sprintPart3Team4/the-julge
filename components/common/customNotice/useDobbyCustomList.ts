import instance from "@/lib/axiosInstance";

export default async function useDobbyCustomList(setCustomNoticeList: any) {
  try {
    const res = await instance.get(`notices?sort=time`);
    const noticeList = res.data.items;
    console.log("API 응답 확인");

    const customList = noticeList.filter((i: any) => i.item.shop.item.address1 === "서울시 중구");

    setCustomNoticeList(customList);
  } catch (error) {
    console.log("API 응답 오류 발생", error);
  }
}
