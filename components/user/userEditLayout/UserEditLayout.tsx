// 알바님 - 편집페이지
import UserInfoRegister from "@/components/register/userInfo/userInfoForm/UserInfoRegister";
import UserInfoForm from "@/components/register/userInfo/userInfoForm/UserInfoForm";
import classNames from "classnames/bind";
import styles from "./UserEditLayout.module.scss";

const cn = classNames.bind(styles);

export default function UserEditLayout() {
  return (
    <div className={cn("Wrap")}>
      <UserInfoRegister />
      <UserInfoForm />
    </div>
  );
}
