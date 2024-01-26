import Image from "next/image";
import LogoImg from "@/public/images/logo.svg";

type LogoProps = {
  size?: "small" | "large";
};

export default function Logo({ size = "small" }: LogoProps) {
  const imageStyle =
    size === "large"
      ? { width: "24.8rem", height: "auto" }
      : { width: "10.885rem", height: "auto", minWidth: "8.4rem" };

  return <Image src={LogoImg} alt="Logo" style={imageStyle} />;
}
