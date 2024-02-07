import { Shop } from "./apiTypes";
import { Notice } from "./noticesType";

export type AlertItem = {
  id: string;
  notice: Notice;
  shop: Shop;
  createdAt: string;
  result: "accepted" | "rejected";
  read: boolean;
  application: {
    item: {
      id: string;
      status: "pending" | "accepted" | "rejected";
    };
    href: string;
  };
};

export type AlertItems = {
  items: AlertItem;
  links: [];
};

export type Alerts = {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  items: AlertItems[];
};
