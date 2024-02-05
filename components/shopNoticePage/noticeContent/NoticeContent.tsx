import classNames from "classnames/bind";

import Panel from "@/components/shopNoticePage/panel/Panel";
import Pay from "../pay/Pay";

import styles from "./NoticeContent.module.scss";
import { NoticeDetail, Shop } from "@/types/apiTypes";
import { MouseEventHandler } from "react";
import Button from "@/components/common/button/Button";

const cn = classNames.bind(styles);

type Props = {
  shop: Shop;
  noticeInfo: NoticeDetail;
  handleButtonClick: MouseEventHandler<HTMLButtonElement>;
};

// 공고 내용 레이아웃
export default function NoticeContent({ shop, noticeInfo, handleButtonClick }: Props) {
  const { name, address1, description: shopDesc, imageUrl, originalHourlyPay } = shop;
  const { hourlyPay, startsAt, workhour, closed } = noticeInfo;
  return (
    <>
      <Panel>
        <Panel.Thumbnail src={imageUrl} alt={name} />
        <div className={cn("contentContainer")}>
          <div className={cn("content")}>
            <Pay>
              <Pay.SubTitle subTitle="시급" />
              <div className={cn("payContainer")}>
                <Pay.HourlyPay hourlypay={hourlyPay} />
                <Pay.HighPayRateBadge hourlyPay={hourlyPay} originalHourlyPay={originalHourlyPay} />
              </div>
            </Pay>
            <Panel.WorkHour startsAt={startsAt} workHour={workhour} isClosed={closed} />
            <Panel.Address address={address1} isClosed={closed} />
            <Panel.shopDescription description={shopDesc} />
          </div>
          <Button text="공고 편집하기" size="flexible" color="secondary" handleButtonClick={handleButtonClick} />
        </div>
      </Panel>
    </>
  );
}
