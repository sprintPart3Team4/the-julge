import React, { ReactNode } from "react";
import classNames from "classnames/bind";

import SubTitle from "../subTitle/SubTitle";
import MainTitle from "../mainTitle/MainTitle";

import styles from "./Title.module.scss";

const cn = classNames.bind(styles);

type Props = {
  children: ReactNode;
};

export default function Title({ children }: Props) {
  return <div className={cn("container")}>{children}</div>;
}

Title.SubTitle = SubTitle;
Title.MainTitle = MainTitle;
