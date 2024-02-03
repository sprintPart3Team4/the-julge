import classNames from "classnames/bind";
import Application from "./Application";
import styles from "./Applications.module.scss";

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

const applicant1: Application = {
  id: "1",
  status: "pending",
  user: {
    name: "김강현",
    bio: "최선을 다해 열심히 일합니다. 다수의 업무 경험을 바탕으로 확실한 일처리를 보여드리겠습니다. 감사합니다.",
    phone: "010-0000-0000",
  },
};

const applicant2: Application = {
  id: "2",
  status: "pending",
  user: {
    name: "김강현",
    bio: "최선을 다해 열심히 일합니다. 다수의 업무 경험을 바탕으로 확실한 일처리를 보여드리겠습니다. 감사합니다.",
    phone: "010-0000-0000",
  },
};

const applicants = [applicant1, applicant2];

export default function Applications() {
  return (
    <div className={cn("wrap")}>
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
            {applicants.map(({ id, status, user: { name, bio, phone } }) => (
              <Application key={id} status={status} name={name} bio={bio} phone={phone} />
            ))}
          </tbody>
        </table>
      </div>
      <div className={cn("pagenationWrap")}>
        <div className={cn("pagenation")}>페이지네이션</div>
      </div>
    </div>
  );
}
