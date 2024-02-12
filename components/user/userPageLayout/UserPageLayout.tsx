import { useAuth } from "@/contexts/AuthProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MyProfile from "@/components/user/myProfile/MyProfile";
import ApplicationList from "@/components/user/userApplication/UserApplications";
import RegisterSuggestion from "@/components/shop/registerSuggestion/RegisterSuggestion";
import Pagenation from "@/components/shopNoticePage/pagenation/Pagenation";
import classNames from "classnames/bind";
import instance from "@/lib/axiosInstance";
import getCookies from "@/lib/getCookies";
import styles from "./UserPageLayout.module.scss";

const cn = classNames.bind(styles);

const LIMIT_PER_SIMGLE_PAGE = 5;
const LIMIT_PER_PAGE_GROUP = 5;

export default function UserPageLayout() {
  const { user } = useAuth();
  const [hasApply, setHasApply] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [applyList, setApplyList] = useState([]);
  const [numberOfTotalApplication, setNumberOfTotalApplication] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const isCheck = user?.name == undefined && user?.address === undefined && user?.phone === undefined;
    if (isCheck) {
      setHasProfile(false);
    } else setHasProfile(true);
    handleChangeData(1);
  }, [user]);

  const handleSuggestion = () => {
    router.push("/profile/edit");
  };

  const handleApply = () => {
    router.push("/");
  };

  //페이지 번호를 클릭하면, 그 페이지 번호를 이용해 offset을 계산해 데이터를 받아와 저장하는 함수
  const handleChangeData = async (page: number) => {
    try {
      const { token, userId } = getCookies();

      const offset = (page - 1) * LIMIT_PER_SIMGLE_PAGE;
      const res = await instance.get(`users/${userId}/applications`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { offset, limit: LIMIT_PER_SIMGLE_PAGE },
      });

      const applyList = res.data.items;
      const count = res.data.count;

      if (applyList && applyList.length > 0) {
        setHasApply(true);
        setApplyList(applyList);
        setNumberOfTotalApplication(count);
        console.log(applyList);
      }
    } catch (error) {
      console.error("페이지 변경 중 에러 발생:", error);
    }
  };

  return (
    <div className={cn("wrap")}>
      <section className={cn(hasProfile && "sectionMyProfile")}>
        <h2>내 프로필</h2>
        {hasProfile ? (
          <div className={cn("myProfile")}>
            <MyProfile />
          </div>
        ) : (
          <div onClick={handleSuggestion}>
            <RegisterSuggestion type="user" />
          </div>
        )}
      </section>
      {hasProfile && (
        <section>
          <h2>신청 내역</h2>
          {hasApply ? (
            <div className={cn("pagenationWrap")}>
              <div className={cn("pagenationTable")}>
                <ApplicationList applyList={applyList} />
              </div>
              <div className={cn("pagenation")}>
                <Pagenation
                  numberOfTotalData={numberOfTotalApplication}
                  limitPerSinglePage={LIMIT_PER_SIMGLE_PAGE}
                  limitPerPageGroup={LIMIT_PER_PAGE_GROUP}
                  handleChangeData={handleChangeData}
                />
              </div>
            </div>
          ) : (
            <div onClick={handleApply}>
              <RegisterSuggestion type="apply" />
            </div>
          )}
        </section>
      )}
    </div>
  );
}
