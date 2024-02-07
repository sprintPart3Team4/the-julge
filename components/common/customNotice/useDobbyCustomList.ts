import instance from "@/lib/axiosInstance";
import getCookies from "@/lib/getCookies";

export default async function useDobbyCustomList(setCustomNoticeList: any) {
  const res = await instance.get(`notices?sort=time`);
  const noticeList = res.data.items;
  console.log(noticeList);

  //data[0].item.shop.item.address1) : 서울시 중구

  const customList = noticeList.filter((i: any) => i.item.shop.item.address1 === "서울시 중구");
  console.log(customList);

  setCustomNoticeList(customList);
}
