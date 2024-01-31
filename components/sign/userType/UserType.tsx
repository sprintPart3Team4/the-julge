import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import styles from "./UserType.module.scss";
import classNames from "classnames/bind";
import checkedButton from "@/public/images/check.svg";
import uncheckedButton from "@/public/images/unCheck.svg";

const cn = classNames.bind(styles);

interface UserTypeProps {
  userType: "employee | employer";
}

export default function UserType({}: UserTypeProps) {
  const [userType, setUserType] = useState<string>("employee");

  const handleRadioChange = (value: string) => {
    setUserType(value);
  };

  const isChecked = (value: string) => {
    return userType === value;
  };

  const { register } = useForm<UserTypeProps>();

  return (
    <div className={cn("userTypeWrap")}>
      <div className={cn("userType")}>회원 유형</div>
      <div className={cn("userTypeRadioBox")}>
        <div>
          <input
            {...register("userType")}
            type="radio"
            value="employee"
            id="employee"
            checked={isChecked("employee")}
            onChange={() => handleRadioChange("employee")}
          />
          <label htmlFor="employee">
            <Image
              src={isChecked("employee") ? checkedButton : uncheckedButton}
              alt="체크이미지"
              width={20}
              height={20}
            />
            <span>알바님</span>
          </label>
        </div>
        <div>
          <input
            {...register("userType")}
            type="radio"
            value="employer"
            id="employer"
            checked={isChecked("employer")}
            onChange={() => handleRadioChange("employer")}
          />
          <label htmlFor="employer">
            <Image
              src={isChecked("employer") ? checkedButton : uncheckedButton}
              alt="체크이미지"
              width={20}
              height={20}
            />
            <span>사장님</span>
          </label>
        </div>
      </div>
    </div>
  );
}
