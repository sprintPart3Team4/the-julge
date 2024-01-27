import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

type Props = {
  src: string | StaticImport;
  alt: string;
  width: number;
  height: number;
  className: string;
};

export default function Thumbnail({ src, alt, width, height, className }: Props) {
  return <Image src={src} alt={alt} width={width} height={height} className={className} />;
}
