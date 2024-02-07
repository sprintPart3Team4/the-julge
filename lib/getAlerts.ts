import instance from "./axiosInstance";
import { Alerts } from "@/types/alertsType";
import getCookies from "./getCookies";

export const getAlerts = async (userId: string | undefined, offset: number = 0, limit: number = 6): Promise<Alerts> => {
  const { token } = getCookies();
  const query = `?offset=${offset}&limit=${limit}`;
  const res = await instance.get(`users/${userId}/alerts${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
