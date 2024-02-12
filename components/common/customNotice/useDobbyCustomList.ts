import instance from "@/lib/axiosInstance";

export default async function useDobbyCustomList(setCustomList: (arg: Array<any>) => void, userId: string) {
  const userData = await instance.get(`users/${userId}`);

  const currentDate = new Date();

  const userAddress = userData.data.item.address;
  const res = (await instance.get(`notices`)).data;
  const customItems = res.items.filter(
    (i: any) => i.item.shop.item.address1 === userAddress && new Date(i.item.startsAt) > currentDate && i.item.closed === false
  );
  let customList = [...customItems];

  const nextUrl = res.links[2].href;
  const url = nextUrl.substring(nextUrl.indexOf("?"));

  if (res.hasNext) {
    recursion(url);
  }

  async function recursion(url: string) {
    const res = (await instance.get(`notices${url}`)).data;
    const customItems = res.items.filter(
      (i: any) => i.item.shop.item.address1 === userAddress && new Date(i.item.startsAt) > currentDate && i.item.closed === false
    );
    customList.push(...customItems);
    if (res.hasNext) {
      const nextUrl = res.links[2].href;
      const nextUrlParams = nextUrl.substring(nextUrl.indexOf("?"));
      recursion(nextUrlParams);
    } else {
      setCustomList(customList);
    }
  }
}
