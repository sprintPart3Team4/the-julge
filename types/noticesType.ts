export type Sort = "time" | "pay" | "hour" | "shop";

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
