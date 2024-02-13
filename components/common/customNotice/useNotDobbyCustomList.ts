import instance from "@/lib/axiosInstance";

export default async function useNotDobbyCustomList(setCustomList: (arg: Array<any>) => void) {
  const res = (await instance.get(`notices`)).data;
  const currentDate = new Date();
  const customItems = res.items.filter(
    (i: any) => new Date(i.item.startsAt) > currentDate && i.item.closed === false
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
      (i: any) => new Date(i.item.startsAt) > currentDate && i.item.closed === false
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
