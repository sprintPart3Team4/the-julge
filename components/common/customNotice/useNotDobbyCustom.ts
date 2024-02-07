import instance from "@/lib/axiosInstance";

export default async function useNotUserCustom(setCustomList: any) {
  const res = await instance.get(`notices?sort=time`);
  const data = res.data.items;
  setCustomList(data);
}