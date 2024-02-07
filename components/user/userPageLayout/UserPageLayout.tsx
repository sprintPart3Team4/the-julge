import classNames from "classnames/bind";
import RegisterSuggestion from "@/components/shop/registerSuggestion/RegisterSuggestion";
import styles from "./UserPageLayout.module.scss";
import MyProfile from "../myProfile/MyProfile";
import ApplicationList from "@/components/user/userApplication/UserApplications";
import { useAuth } from "@/contexts/AuthProvider";
import { useEffect, useState } from "react";
import getCookies from "@/lib/getCookies";
import instance from "@/lib/axiosInstance";
import { useRouter } from "next/router";

const cn = classNames.bind(styles);

export default function UserPageLayout() {
  const { user } = useAuth();
  const [hasApply, setHasApply] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [applyList, setApplyList] = useState([]);
  const router = useRouter();

  console.log(user);
  useEffect(() => {
    if (user === null) {
      setHasProfile(false);
    } else setHasProfile(true);

    const getUserApplicationInfo = async () => {
      try {
        const { token, userId } = getCookies();

        const res = await instance.get(`users/${userId}/applications`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const applyList = res.data.items;
        console.log("applyList 데이터:", applyList);

        if (applyList && applyList.length > 0) {
          setHasApply(true);
          setApplyList(applyList);
        }
      } catch (error) {
        console.error("에러 발생:", error);
      }
    };

    getUserApplicationInfo();
  }, [user]);

  const handleSuggestion = () => {
    router.push("/profile/edit");
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
          {hasApply ? <ApplicationList applyList={applyList} /> : <RegisterSuggestion type="apply" />}
        </section>
      )}
    </div>
  );
}
