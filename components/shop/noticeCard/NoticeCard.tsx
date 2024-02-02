import React, { forwardRef, Ref } from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import HighPayRateBadge from "@/components/shopNoticePage/highPayRateBadge/HighPayRateBadge";
import LocationIcon from "@/public/images/location.svg";
import GreyLocationIcon from "@/public/images/location_grey.svg";
import ClockIcon from "@/public/images/clock.svg";
import GreyClockIcon from "@/public/images/clock_grey.svg";
// import { useAuth } from "@/contexts/AuthProvider";
import styles from "./NoticeCard.module.scss";
import { getFullDate } from "@/lib/getFullDate";

const cn = classNames.bind(styles);

type NoticeCardProps = {
  startsAt: string;
  workhour: number;
  hourlyPay: number;
  closed?: boolean;
};

const NoticeCard = React.forwardRef(
  ({ startsAt, workhour, hourlyPay, closed = false }: NoticeCardProps, ref: Ref<HTMLDivElement>) => {
    // const shopInfo = useAuth().shop;
    // 로그인 기능 만들어지기 전 임시로 만들어놓은 데이터
    const shopInfo = {
      id: "2fd3b8d8-cda3-4e83-a6ff-b6d177437a2b",
      name: "더줄게",
      category: "한식",
      address1: "서울시 도봉구",
      address2: "쌍문동",
      description: "막퍼줄게 정말로 진짜진짜로 시급도 간식도 주휴수당도 전부전부",
      imageUrl: "https://picsum.photos/200/300",
      originalHourlyPay: 9860,
      user: {
        item: {
          id: "d8ec5811-0da2-4caa-8ac6-d09de8ae4b25",
          email: "thejulge@codeit.com",
          type: "employer",
        },
        href: "/api/2-4/the-julge/users/d8ec5811-0da2-4caa-8ac6-d09de8ae4b25",
      },
    };

    // 구조분해할당 시 오류
    const imageUrl = shopInfo?.imageUrl;
    const name = shopInfo?.name;
    const address1 = shopInfo?.address1;
    const originalHourlyPay = shopInfo?.originalHourlyPay;

    return (
      <div className={cn("wrap", { closed })} ref={ref}>
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
);

NoticeCard.displayName = "NoticeCard";
export default NoticeCard;
