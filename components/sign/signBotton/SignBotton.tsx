import React from "react";
import styles from "./signBottom.module.scss";
import classNames from "classnames/bind";
import Link from "next/link";

const cn = classNames.bind(styles);

interface SignBottomProps {
  text: "회원이 아니신가요?" | "이미 가입하셨나요?";
  href: "/signup" | "/signin";
  textLink: "로그인하기" | "회원가입하기";
}

export default function SignBottom({ text, href, textLink }: SignBottomProps) {
  return (
    <div className={cn("signBottonWrap")}>
      <span className={cn("signBottomText")}>{text}</span>
      <Link href={href} className={cn("signBottomLink")}>
        {textLink}
      </Link>
    </div>
  );
}
