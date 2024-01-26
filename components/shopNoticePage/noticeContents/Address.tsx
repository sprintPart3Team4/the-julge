import Image from "next/image";
import LocationActive from "@/public/images/location.svg";
import LocationInactive from "@/public/images/location_grey.svg";

type Props = {
  address: string;
  className: string;
  isClosed?: boolean;
};

export default function Address({ address, className, isClosed = false }: Props) {
  const ImageSrc = isClosed ? LocationInactive : LocationActive;
  return (
    <div className={className}>
      <Image src={ImageSrc} alt="위치를 나타내기 위한 아이콘" width={20} height={20} />
      {address}
    </div>
  );
}
