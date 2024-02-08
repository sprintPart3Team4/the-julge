import { Shop } from "./apiTypes";
import { Notice } from "./noticesType";

export type AlertItem = {
  id: string;
  notice: {
    item: Notice;
    href: string;
  };
  shop: {
    item: Shop;
    href: string;
  };
  createdAt: string;
  result: "accepted" | "rejected" | "canceled";
  read: boolean;
  application: {
    item: {
      id: string;
      status: "pending" | "accepted" | "rejected" | "canceled";
    };
    href: string;
  };
};

export type AlertItems = {
  item: AlertItem;
  links: [];
};

export type Alerts = {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  items: AlertItems[];
};
