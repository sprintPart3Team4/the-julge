import classNames from "classnames/bind";

import Panel from "@/components/shopNoticePage/panel/Panel";
import Pay from "../pay/Pay";

import Test from "@/public/images/test.png";

import styles from "./NoticeContent.module.scss";

const cn = classNames.bind(styles);

// 공고 내용 레이아웃
export default function NoticeContent() {
  // API 연동 후, 데이터 받아와서 전달 - 현재는 임시 데이터를 그냥 채워넣음.
  const shopDesc = "알바하기 편한 너구리네 라면집! 라면 올려두고 끓이기만 하면 되어서 쉬운 편에 속하는 가게입니다.";
  return (
    <>
      <Panel>
        <Panel.Thumbnail src={Test} alt="리애" />
        <div className={cn("contentContainer")}>
          <div className={cn("content")}>
            <Pay>
              <Pay.SubTitle subTitle="시급" />
              <div className={cn("payContainer")}>
                <Pay.HourlyPay hourlypay={15000} />
                <Pay.HighPayRateBadge hourlyPay={15000} originalHourlyPay={10000} />
              </div>
            </Pay>
            <Panel.WorkHour startsAt="2024-02-14T08:00:00Z" workHour={8} isClosed={false} />
            <Panel.Address address="서울시 강남구" isClosed={true} />
            <Panel.shopDescription description={shopDesc} />
          </div>
          {/* 버튼 컴포넌트가 만들어지면 그걸 삽입 예정 */}
          <button className={cn("editButton")}>공고 편집하기</button>
        </div>
      </Panel>
    </>
  );
}
