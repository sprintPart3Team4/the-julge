import instance from "@/lib/axiosInstance";
import getCookies from "@/lib/getCookies";

export default async function useDobbyCustomList(setCustomNoticeList: any) {
  const { userId } = getCookies();
  try {
    const notices = await instance.get(`notices?sort=time`);
    console.log("공고 API 응답 확인");
    const noticeList = notices.data.items;

    const userData = await instance.get(`users/${userId}`);
    console.log("유저 API 응답 확인");
    const userAddress = userData.data.item.address;

    let customList; 
    
    const userCustomList = noticeList.filter((i: any) => i.item.shop.address1 === userAddress);
    if (userCustomList.length < 1) {
      customList = noticeList;
      console.log("주소에 해당되는 공고가 없습니다.");
    } else {
      customList = userCustomList;
    }

    setCustomNoticeList(customList);
  } catch (error) {
    console.log("API 응답 오류 발생", error);
  }
}