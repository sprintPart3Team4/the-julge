import React from "react";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames/bind";
import HighPayRateBadge from "@/components/shopNoticePage/highPayRateBadge/HighPayRateBadge";
import LocationIcon from "@/public/images/location.svg";
import GreyLocationIcon from "@/public/images/location_grey.svg";
import ClockIcon from "@/public/images/clock.svg";
import GreyClockIcon from "@/public/images/clock_grey.svg";
import { getFullDate } from "@/lib/getFullDate";
import styles from "./NoticeCard.module.scss";

const cn = classNames.bind(styles);

type Props = {
  noticeId: string;
  startsAt: string;
  workhour: number;
  hourlyPay: number;
  closed?: boolean;
  isPast?: boolean;
  noticeShopId?: string | undefined;
  myShopId?: string;
  imageUrl: string;
  name: string;
  address1: string;
  originalHourlyPay: number;
};

export default function NoticeCard({
  noticeId,
  startsAt,
  workhour,
  hourlyPay,
  closed,
  noticeShopId,
  myShopId,
  imageUrl,
  name,
  address1,
  originalHourlyPay,
}: Props) {
  const query = `?s=${noticeShopId}&u=${noticeId}`;
  const href = noticeShopId === myShopId ? `shop/${noticeId}` : `detail${query}`;

  const registeredDate = new Date(startsAt);
  const today = new Date();
  const diff = +today - +registeredDate;
  const resultDate = Math.floor(+diff / (1000 * 60 * 60 * 24) + 1);
  const isPast = resultDate > 0 ? true : false;

  return (
    <Link href={href}>
      <div className={cn("wrap", { closed, isPast })}>
        <div className={cn("imageWidth")}>
          <div className={cn("imageHeight")}>
            {closed && <div className={cn("imgOverlay")}>마감 완료</div>}
            {isPast && <div className={cn("imgOverlay")}>지난 공고</div>}
            <Image className={cn("image")} src={imageUrl} alt="가게 이미지" fill />
          </div>
        </div>
        <div className={cn("contents")}>
          <span className={cn("shopName")}>{name}</span>
          <div className={cn("time")}>
            <Image src={closed || isPast ? GreyClockIcon : ClockIcon} alt="시계 아이콘" width={20} height={20} />
            <span>{getFullDate(startsAt, workhour)}</span>
          </div>
          <div className={cn("location")}>
            <Image src={closed || isPast ? GreyLocationIcon : LocationIcon} alt="장소 아이콘" width={20} height={20} />
            <span>{address1}</span>
          </div>
          <div className={cn("pays")}>
            <span className={cn("pay")}>{Number(hourlyPay).toLocaleString("ko-KR")}원</span>
            <HighPayRateBadge
              isListedCard
              closed={closed}
              isPast={isPast}
              hourlyPay={hourlyPay}
              originalHourlyPay={originalHourlyPay || 0}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
