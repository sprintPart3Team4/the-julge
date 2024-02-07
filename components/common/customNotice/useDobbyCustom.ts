import instance from "@/lib/axiosInstance";

export default async function useUserCustom(setDobbysCustomList: any, token: string) {
  const res = await instance.get(`notices?sort=time`);
  const data = res.data.items;
  setDobbysCustomList(data);
}
