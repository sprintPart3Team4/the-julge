import Image from "next/image";
import LogoImg from "@/public/images/logo.svg";
import styles from "./Logo.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);
type LogoProps = {
  size?: "small" | "large";
};

export default function Logo({ size = "small" }: LogoProps) {
  return <Image src={LogoImg} alt="Logo" className={cn(size)} />;
}
