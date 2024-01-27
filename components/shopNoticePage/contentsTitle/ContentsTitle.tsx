import React from "react";
import Category from "./Category";
import Title from "./Title";

type Props = {
  className: string;
  children: React.ReactNode;
};

export default function ContentsTitle({ className, children }: Props) {
  return <div className={className}>{children}</div>;
}

ContentsTitle.Category = Category;
ContentsTitle.Title = Title;
