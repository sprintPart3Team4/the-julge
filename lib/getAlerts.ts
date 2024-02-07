import instance from "./axiosInstance";
import getCookies from "./getCookies";

type Props = {
  userId: string | undefined;
  offset?: number | undefined;
  limit?: number | undefined;
};

type Alerts = {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  items: any[];
};

export const getAlerts = async ({ userId, offset = 0, limit = 6 }: Props): Promise<Alerts> => {
  const { token } = getCookies();
  const query = `?offset=${offset}&limit=${limit}`;
  const res = await instance.get(`users/${userId}/alerts${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
