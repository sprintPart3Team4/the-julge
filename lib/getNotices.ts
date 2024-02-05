import instance from "./axiosInstance";

type Sort = "time" | "pay" | "hour" | "shop";

export const getNotices = async (
  offset = 0,
  limit: number,
  keyword?: string,
  address?: string[],
  startsAtGte?: string,
  hourlyPayGte?: number,
  sort?: Sort
): Promise<Notices> => {
  const keywordQuery = keyword ? `&keyword=${keyword}` : "";
  const addressQuery = address ? `&address=${address}` : "";
  const startsAtGteQuery = startsAtGte ? `&startsAtGte=${startsAtGte}` : "";
  const hourlyPayGteQuery = hourlyPayGte ? `&hourlyPayGte=${hourlyPayGte}` : "";
  const sortQuery = sort ? `&sort=${sort}` : "";

  const query = `?offset=${offset}&limit=${limit}${keywordQuery}${addressQuery}${startsAtGteQuery}${hourlyPayGteQuery}${sortQuery}`;

  const res = await instance.get(`notices${query}`);

  return res.data;
};

export type Filter = {
  address?: string[];
  startsAtGte?: string;
  hourlyPayGte?: number;
};

export type Notices = {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  address: string[];
  keyword: string;
  items: NoticeItem[];
  links: [];
};

export type NoticeList = NoticeItem[];

export type NoticeItem = {
  item: Notice;
  links: [];
};

export type Notice = {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
  shop: {
    item: Shop;
    href: string;
  };
};

export type Shop = {
  id?: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
};
