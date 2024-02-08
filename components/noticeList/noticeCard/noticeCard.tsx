import React from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import HighPayRateBadge from "@/components/shopNoticePage/highPayRateBadge/HighPayRateBadge";
import LocationIcon from "@/public/images/location.svg";
import GreyLocationIcon from "@/public/images/location_grey.svg";
import ClockIcon from "@/public/images/clock.svg";
import GreyClockIcon from "@/public/images/clock_grey.svg";
import { useAuth } from "@/contexts/AuthProvider";
import { getFullDate } from "@/lib/getFullDate";
import styles from "./NoticeCard.module.scss";

const cn = classNames.bind(styles);

type Props = {
  startsAt: string;
  workhour: number;
  hourlyPay: number;
  closed?: boolean;
};

export default function NoticeCard({ startsAt, workhour, hourlyPay, closed = false }: Props) {
  const { shop } = useAuth();

  if (!shop) return;
  const { imageUrl, name, address1, originalHourlyPay } = shop;

  return (
    <div className={cn("wrap", { closed })}>
      <div className={cn("imageWidth")}>
        <div className={cn("imageHeight")}>
          {closed && <div className={cn("imgOverlay")}>마감 완료</div>}
          <Image className={cn("image")} src={imageUrl || ""} alt="가게 이미지" fill />
        </div>
      </div>
      <div className={cn("contents")}>
        <span className={cn("shopName")}>{name}</span>
        <div className={cn("time")}>
          <Image src={closed ? GreyClockIcon : ClockIcon} alt="시계 아이콘" width={20} height={20} />
          <span>{getFullDate(startsAt, workhour)}</span>
        </div>
        <div className={cn("location")}>
          <Image src={closed ? GreyLocationIcon : LocationIcon} alt="장소 아이콘" width={20} height={20} />
          <span>{address1}</span>
        </div>
        <div className={cn("pays")}>
          <span className={cn("pay")}>{hourlyPay.toLocaleString("ko-KR")}원</span>
          <HighPayRateBadge
            isListedCard
            closed={closed}
            hourlyPay={hourlyPay}
            originalHourlyPay={originalHourlyPay || 0}
          />
        </div>
      </div>
    </div>
  );
}
