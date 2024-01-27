import React from "react";
import Thumbnail from "./Thumbnail";
import HourlyPay from "./HourlyPay";
import HourlyPayBadge from "./HourlyPayBadge";
import WorkHour from "./WorkHour";
import Address from "./Address";
import ShopDescription from "./ShopDescription";

type Props = {
  className: string;
  children: React.ReactNode;
};

export default function Panel({ className, children }: Props) {
  return <div className={className}>{children}</div>;
}

Panel.Thumbnail = Thumbnail;
// 이슈넘버 28번 머지하고 나면, title 컴포넌트도 여기에 컴파운드 시키기
Panel.HourlyPay = HourlyPay;
Panel.HourlyPayBadge = HourlyPayBadge;
Panel.WorkHour = WorkHour;
Panel.Address = Address;
Panel.shopDescription = ShopDescription;
