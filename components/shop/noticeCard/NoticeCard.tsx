import classNames from "classnames/bind";
import Image from "next/image";
import { storeInfo, noticeList } from "@/pages/api/mockdata";
import TestImage from "@/public/images/shop-sample.png";
import LocationIcon from "@/public/images/location.svg";
import GreyLocationIcon from "@/public/images/location_grey.svg";
import ClockIcon from "@/public/images/clock.svg";
import GreyClockIcon from "@/public/images/clock_grey.svg";
import styles from "./NoticeCard.module.scss";

const cn = classNames.bind(styles);

type NoticeCardProps = {
  isClosed?: boolean;
};

export default function NoticeCard({ isClosed = false }: NoticeCardProps) {
  return (
    <div className={cn("container", { closed: isClosed })}>
      {closed && <div className={cn("imgOverlay")}>마감 완료</div>}
      <Image className={cn("image")} src={TestImage} alt="테스트 이미지" width={280} />
      <div className={cn("contents")}>
        <span className={cn("shopName")}>{storeInfo.item.name}</span>
        <div className={cn("time")}>
          <Image src={closed ? GreyClockIcon : ClockIcon} alt="시계 아이콘" width={20} />
          <span>
            {noticeList.items[0].item.startsAt} ({noticeList.items[0].item.workhour}시간)
          </span>
        </div>
        <div className={cn("location")}>
          <Image src={closed ? GreyLocationIcon : LocationIcon} alt="장소 아이콘" width={20} />
          <span>{storeInfo.item.address1}</span>
        </div>
        <span className={cn("pay")}>{noticeList.items[0].item.hourlyPay.toLocaleString()}원</span>
      </div>
    </div>
  );
}
