import React from "react";
import Category from "./Category";
import Title from "./Title";

type Props = {
  className: string;
  children: React.ReactNode;
};

export default function NoticeTitle({ className, children }: Props) {
  return <div className={className}>{children}</div>;
}

NoticeTitle.Category = Category;
NoticeTitle.Title = Title;
