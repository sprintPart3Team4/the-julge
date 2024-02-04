import classNames from "classnames/bind";
import Application from "./Application";
import styles from "./Applications.module.scss";
import { ApplicationList } from "@/types/apiTypes";

const cn = classNames.bind(styles);

type Application = {
  id: string;
  status: "pending" | "accepted" | "rejected" | "canceled";
  user: {
    name?: string;
    bio?: string;
    phone?: string;
  };
};

type Props = {
  applicationList: ApplicationList;
};

export default function Applications({ applicationList }: Props) {
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
            <th className={cn("th", "name")}>지원자</th>
            <th className={cn("th", "bio")}>소개</th>
            <th className={cn("th", "phone")}>전화번호</th>
            <th className={cn("th", "status")}>상태</th>
          </tr>
        </thead>
        <tbody className={cn("tbody")}>
          {applicationList.map(
            ({
              item: {
                id,
                status,
                user: {
                  item: { name, bio, phone },
                },
              },
            }) => (
              <Application key={id} applicationId={id} status={status} name={name} bio={bio} phone={phone} />
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
