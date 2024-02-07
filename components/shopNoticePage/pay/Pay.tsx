import React from "react";
import classNames from "classnames/bind";

import SubTitle from "@/components/common/titleBox/subTitle/SubTitle";
import HourlyPay from "../hourlyPay/HourlyPay";
import HighPayRateBadge from "../highPayRateBadge/HighPayRateBadge";

import styles from "./Pay.module.scss";

const cn = classNames.bind(styles);

type Props = {
  children: React.ReactNode;
};

export default function Pay({ children }: Props) {
  return <div className={cn("container")}>{children}</div>;
}

Pay.SubTitle = SubTitle;
Pay.HourlyPay = HourlyPay;
Pay.HighPayRateBadge = HighPayRateBadge;
