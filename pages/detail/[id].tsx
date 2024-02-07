import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NoticeCard from "@/components/shop/noticeCard/NoticeCard";
import MainTitle from "@/components/common/titleBox/mainTitle/MainTitle";
import getCookies from "@/lib/getCookies";
import classNames from "classnames/bind";
import styles from "@/styles/detail.module.scss";

const cn = classNames.bind(styles);

type Card = {
  item: {
    id: string;
    hourlyPay: number;
    startsAt: string;
    workhour: number;
    description: string;
    closed: boolean;
  };
  links: string[];
};

type NoticeInfo = {
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed?: boolean;
};

type ShopInfo = {
  name: string;
  category: string;
  address1: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
};

export default function DetailPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [changeButton, setChangeButton] = useState<boolean>(false);
  const [isUser, setIsUser] = useState<string>("");
  const [userType, setUserType] = useState<string>("");
  const [cardList, setCardList] = useState<Card[]>([]);
  const [watchedItem, setWatchedItem] = useState<Card[]>([]);
  const [noticeInfo, setNoticeInfo] = useState<NoticeInfo>({
    hourlyPay: 0,
    startsAt: "",
    workhour: 0,
    description: "",
    closed: false,
  });
  const [shopInfo, setShopInfo] = useState<ShopInfo>({
    name: "",
    category: "",
    address1: "",
    description: "",
    imageUrl: "",
    originalHourlyPay: 0,
  });
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  const isClosed = noticeInfo.closed ? "active" : "";
  const buttonType = isFinished ? "취소하기" : "신청하기";
  const buttonColor = isFinished ? "secondary" : "primary";
  let isPast;

  cardList.map((card) => {
    const registeredDate = new Date(card.item.startsAt);
    const today = new Date();
    const diff = +today - +registeredDate;

    const resultDate = Math.floor(+diff / (1000 * 60 * 60 * 24) + 1);

    isPast = resultDate > 0 ? true : false;
  });

  const status = {
    status: "canceled",
  };

  const handleRegisterClick = () => {
    !user ? setIsModalOpen(true) : handleApply();
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleCancelButtonClick = () => {
    setIsModalOpen(false);
    setChangeButton(false);
    handleCancelApply();
    setIsFinished(false);
  };

  const handleButtonClick = () => {
    const { userId } = getCookies();

    if (userType === "employer") {
      handleModalOpen();
    }

    if (isUser === undefined) {
      handleModalOpen();
    } else {
      isFinished ? handleModalOpen() : handleRegisterClick();
    }

    setUserType(user !== null ? user.type : "");
    setIsUser(userId);
  };

  const handleCancelApply = async () => {
    const { token } = getCookies();

    await instance.put(`/shops/${id}/notices/7517d116-f3c5-494e-91f6-223d5c16952b/applications/${isFinished}`, status, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const handleApply = async () => {
    const { token } = getCookies();

    const res = await instance.post(`shops/${id}/notices/7517d116-f3c5-494e-91f6-223d5c16952b/applications`, user, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setIsFinished(res.data.item.id);
  };

  const handleLoadNoticeDetail = async () => {
    const { token } = getCookies();

    const res = await instance.get(`shops/${id}/notices/7517d116-f3c5-494e-91f6-223d5c16952b`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setNoticeInfo(res.data.item);
    setShopInfo(res.data.item.shop.item);
  };

  const handleLoadNotice = async () => {
    const res = await instance.get(`shops/${id}/notices`);
    setCardList(res.data.items);
  };

  useEffect(() => {
    if (id) {
      const stored = localStorage.getItem("watched");
      let watched = stored ? JSON.parse(stored) : [];
      watched.unshift(id);

      const uniqueWatched = [...new Set(watched)];
      localStorage.setItem("watched", JSON.stringify(uniqueWatched));
      setWatchedItem(cardList.filter((card) => uniqueWatched.includes(card.item.id)).slice(0, 6));
    }
  }, [id, cardList]);

  useEffect(() => {
    handleLoadNotice();
    handleLoadNoticeDetail();
  }, []);

  return (
    <div className={cn("detailContainer")}>
      <div className={cn("noticeTitle")}>
        <div>
          <Title>
            <Title.SubTitle subTitle={shopInfo.category} />
            <Title.MainTitle mainTitle={shopInfo.name} />
          </Title>
        </div>
        <div className={cn("panelContainer")}>
          <Panel>
            <div className={cn("imgWrap", { active: isClosed })}>
              <Panel.Thumbnail src={shopInfo.imageUrl} alt={shopInfo.imageUrl} />
              <span>마감 완료</span>
            </div>
            <div className={cn("contentContainer")}>
              <div className={cn("content")}>
                <Pay>
                  <Pay.SubTitle subTitle="시급" />
                  <div className={cn("payContainer")}>
                    <Pay.HourlyPay hourlypay={noticeInfo.hourlyPay} />
                    <Pay.HighPayRateBadge
                      hourlyPay={noticeInfo.hourlyPay}
                      originalHourlyPay={shopInfo.originalHourlyPay}
                    />
                  </div>
                </Pay>
                <Panel.WorkHour startsAt={noticeInfo.startsAt} workHour={noticeInfo.workhour} isClosed={false} />
                <Panel.Address address={shopInfo.address1} isClosed={false} />
                <Panel.shopDescription description={shopInfo.description} />
              </div>
              {noticeInfo.closed ? (
                <Button text="신청 불가" size="flexible" color="disabled" />
              ) : (
                <Button text={buttonType} size="flexible" color={buttonColor} handleButtonClick={handleButtonClick} />
              )}
            </div>
          </Panel>
        </div>
        <div className={cn("desWrap")}>
          <NoticeDescription noticeDescription={noticeInfo.description} />
        </div>
      </div>
      {isModalOpen && (
        <Modal>
          <Modal.WarningConfirm size="small" text="내 프로필을 먼저 등록해 주세요." setIsModalOpen={setIsModalOpen} />
        </Modal>
      )}
      {isFinished && isModalOpen && (
        <Modal>
          <Modal.YesOrNo
            text="신청을 취소하시겠어요?"
            yesButtonText="취소하기"
            handleYesButtonClick={handleCancelButtonClick}
            setIsModalOpen={setIsModalOpen}
          />
        </Modal>
      )}
      {isUser === undefined && isModalOpen && (
        <Modal>
          <Modal.Warning text="먼저 로그인을 해주세요" size="small" setIsModalOpen={setIsModalOpen} />
        </Modal>
      )}
      {userType === "employer" && isModalOpen && (
        <Modal>
          <Modal.Warning text="사장님은 신청할 수 없습니다" size="small" setIsModalOpen={setIsModalOpen} />
        </Modal>
      )}
      <Title>
        <MainTitle mainTitle="최근에 본 공고" />
      </Title>
      <div className={cn("wrap")}>
        {watchedItem.map((card) => {
          return (
            <NoticeCard
              key={card.item.id}
              startsAt={card.item.startsAt}
              workhour={card.item.workhour}
              hourlyPay={card.item.hourlyPay}
              closed={noticeInfo.closed ? true : card.item.closed}
            />
          );
        })}
      </div>
    </div>
  );
}
