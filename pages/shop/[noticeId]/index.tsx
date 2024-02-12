import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";

import NavBar from "@/components/common/navBar/NavBar";
import Footer from "@/components/common/footer/Footer";
import Title from "@/components/common/titleBox/title/Title";
import NoticeContent from "@/components/shopNoticePage/noticeContent/NoticeContent";
import NoticeDescription from "@/components/shopNoticePage/noticeDescription/NoticeDescription";
import Applications from "@/components/shopNoticePage/applications/Applications";
import Pagenation from "@/components/shopNoticePage/pagenation/Pagenation";
import Loading from "@/components/common/loading/Loading";

import { useAuth } from "@/contexts/AuthProvider";
import { getApplicationList, getNotice } from "@/lib/shopNoticePage";
import { ApplicationList, NoticeDetail } from "@/types/apiTypes";

import styles from "@/styles/shopNoticeDetail.module.scss";

const cn = classNames.bind(styles);

export default function NoticeDetailPage() {
  const router = useRouter();
  const { noticeId } = router.query;
  const { shop } = useAuth();

  const [noticeInfo, setNoticeInfo] = useState<NoticeDetail>();
  const [applicationList, setAppliacationList] = useState<ApplicationList>();
  const [numberOfTotalApplication, setNumberOfTotalApplication] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const LIMIT_PER_SINGLE_PAGE = 5; // 한 페이지에 보여줄 데이터의 개수
  const LIMIT_PER_PAGE_GROUP = 5; // 한 번에 보여줄 페이지 번호의 개수

  useEffect(() => {
    if (!shop || !shop.id || typeof noticeId !== "string") return;

    try {
      getNotice(shop.id, noticeId, setNoticeInfo);
      getApplicationList(shop.id, noticeId, LIMIT_PER_SINGLE_PAGE, setNumberOfTotalApplication, setAppliacationList);
    } finally {
      setIsLoading(false);
    }
  }, [shop]);

  // 유저가 잘못된 경로로 들어오면, 아래의 로딩 중이 아닌, 에러 발생 -> 나중에 404 페이지 만들기?
  if (!shop || typeof noticeId !== "string" || isLoading || !noticeInfo || !applicationList) return <Loading />;

  const handleChangeData = (pageNumber: number) => {
    if (!shop.id) return;
    getApplicationList(
      shop.id,
      noticeId,
      LIMIT_PER_SINGLE_PAGE,
      setNumberOfTotalApplication,
      setAppliacationList,
      pageNumber
    );
  };

  // 나중에 현수님이 작업하신 페이지 가져오기
  const handleEditPageOpen = () => {
    router.push(`${noticeId}/EditNotice`);
  };

  return (
    <div>
      <NavBar />
      <div className={cn("sectionWrap")}>
        <section className={cn("noticeWrap")}>
          <div className={cn("noticeTitle")}>
            <Title>
              <Title.SubTitle subTitle={shop.category} />
              <Title.MainTitle mainTitle={shop.name} />
            </Title>
          </div>
          <NoticeContent shop={shop} noticeInfo={noticeInfo} handleButtonClick={handleEditPageOpen} />
          <NoticeDescription noticeDescription={noticeInfo.description} />
        </section>
      </div>
      {applicationList?.length !== 0 ? (
        <section className={cn("applicationWrap")}>
          <Title>
            <Title.MainTitle mainTitle="신청자 목록" />
          </Title>
          <div className={cn("pagenationWrap")}>
            <Applications applicationList={applicationList} />
            <div className={cn("pagenation")}>
              <Pagenation
                numberOfTotalData={numberOfTotalApplication}
                limitPerSinglePage={LIMIT_PER_SINGLE_PAGE}
                limitPerPageGroup={LIMIT_PER_PAGE_GROUP}
                handleChangeData={handleChangeData}
              />
            </div>
          </div>
        </section>
      ) : (
        <div className={cn("noApplication")}>아직 지원자가 없습니다.</div>
      )}
      <Footer />
    </div>
  );
}
