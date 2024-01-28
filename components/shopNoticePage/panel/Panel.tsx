import React from "react";
import classNames from "classnames/bind";

import Thumbnail from "../thumbnail/Thumbnail";
import Pay from "../pay/Pay";
import WorkHour from "../workHour/WorkHour";
import Address from "../address/Address";
import ShopDescription from "../shopDescription/ShopDescription";

import styles from "./Panel.module.scss";

const cn = classNames.bind(styles);

type Props = {
  children: React.ReactNode;
};

export default function Panel({ children }: Props) {
  return <div className={cn("container")}>{children}</div>;
}

Panel.Thumbnail = Thumbnail;
Panel.Pay = Pay;
Panel.WorkHour = WorkHour;
Panel.Address = Address;
Panel.shopDescription = ShopDescription;
