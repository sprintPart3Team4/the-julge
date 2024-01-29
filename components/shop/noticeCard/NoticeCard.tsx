import classNames from "classnames/bind";
import Image from "next/image";
import HighPayRateBadge from "@/components/shopNoticePage/highPayRateBadge/HighPayRateBadge";
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
    <div className={cn("wrap", { closed: isClosed })}>
      {isClosed && <div className={cn("imgOverlay")}>마감 완료</div>}
      <Image className={cn("image")} src={TestImage} alt="테스트 이미지" />
      <div className={cn("contents")}>
        <span className={cn("shopName")}>{storeInfo.item.name}</span>
        <div className={cn("time")}>
          <Image src={isClosed ? GreyClockIcon : ClockIcon} alt="시계 아이콘" />
          <span>
            {noticeList.items[0].item.startsAt} ({noticeList.items[0].item.workhour}시간)
          </span>
        </div>
        <div className={cn("location")}>
          <Image src={isClosed ? GreyLocationIcon : LocationIcon} alt="장소 아이콘" />
          <span>{storeInfo.item.address1}</span>
        </div>
        <div className={cn("pays")}>
          <span className={cn("pay")}>{noticeList.items[0].item.hourlyPay.toLocaleString()}원</span>
          <HighPayRateBadge hourlyPay={10000} originalHourlyPay={150000} />
        </div>
      </div>
    </div>
  );
}
