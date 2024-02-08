import classNames from "classnames/bind";
import UserApplication from "./UserApplication";
import styles from "./UserApplications.module.scss";
import { UserApplicationList } from "@/types/apiTypes";
import { useState, useEffect } from "react";
import instance from "@/lib/axiosInstance";
import getCookies from "@/lib/getCookies";
import { useAuth } from "@/contexts/AuthProvider";

const cn = classNames.bind(styles);

type UserApplication = {
  id: string;
  status: "pending" | "accepted" | "rejected" | "canceled";
  user: {
    name?: string;
    bio?: string;
    phone?: string;
  };
};

type Props = {
  applyList: UserApplicationList;
};

export default function UserApplications({ applyList }: Props) {
  return (
    <div className={cn("tableWrap")}>
      <table className={cn("table")}>
        <colgroup>
          <col style={{ width: "22.8rem" }} />
          <col style={{ width: "30rem" }} />
          <col style={{ width: "20rem" }} />
          <col style={{ width: "23.6rem" }} />
        </colgroup>
        <thead>
          <tr className={cn("tr")}>
            <th className={cn("th", "name")}>가게</th>
            <th className={cn("th", "bio")}>일자</th>
            <th className={cn("th", "phone")}>시급</th>
            <th className={cn("th", "status")}>상태</th>
          </tr>
        </thead>
        <tbody className={cn("tbody")}>
          {applyList &&
            applyList.map(
              ({
                item: {
                  id,
                  status,
                  shop: {
                    item: { name },
                  },
                  notice: {
                    item: { hourlyPay, startsAt },
                  },
                },
              }) => (
                <UserApplication
                  key={id}
                  applicationId={id}
                  status={status}
                  name={name}
                  startsAt={startsAt}
                  hourlyPay={hourlyPay}
                />
              )
            )}
        </tbody>
      </table>
    </div>
  );
}
