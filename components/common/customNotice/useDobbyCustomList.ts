import instance from "@/lib/axiosInstance";

export default async function useDobbyCustomList(setCustomList: (arg: Array<any>)=> void, userId: string) {
  try {
    const notices = await instance.get(`notices?sort=time`);
    const noticeList = notices.data.items;

    const userData = await instance.get(`users/${userId}`);
    const userAddress = userData.data.item.address;

    let customList; 
    
    const userCustomList = noticeList.filter((i: any) => i.item.shop.address1 === userAddress);
    if (userCustomList.length < 1) {
      customList = noticeList;
      console.log("주소에 해당되는 공고가 없습니다.");
    } else {
      customList = userCustomList;
    }

    setCustomList(customList);
  } catch (error) {
    console.log("API 응답 오류 발생", error);
  }
}