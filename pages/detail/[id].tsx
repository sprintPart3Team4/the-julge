import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NoticeCard from "@/components/shop/noticeCard/NoticeCard";
import MainTitle from "@/components/common/titleBox/mainTitle/MainTitle";
import getCookies from "@/lib/getCookies";

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
  workHour: number;
  description: string;
};

type ShopInfo = {
  name: string,
  category: string;
  address1: string,
  description: string,
  imageUrl: string,
  originalHourlyPay: number,
};

export default function DetailPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [cardList, setCardList] = useState<Card[]>([]);
  const [watchedItem, setWatchedItem] = useState<Card[]>([]);
  const [noticeInfo, setNoticeInfo] = useState<NoticeInfo>({
    hourlyPay: 0,
    startsAt: "",
    workHour: 0,
    description: "",
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
  const { noticeId } = router.query;

  const handleRegisterClick = () => {
    if (!user) {
      setIsModalOpen(true);
    } else {
      handleApply();
    }
  };

  const handleCancelClick = () => {
    setIsModalOpen(true);
  };

  const handleButtonClick = () => {
    setIsModalOpen(false);
    handleCancelApply();
  };

  const status = {
    status: "canceled",
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

  const handleNoticeInfo = async () => {
    const { token } = getCookies();

    const res = await instance.get(
      `shops/2fd3b8d8-cda3-4e83-a6ff-b6d177437a2b/notices/7517d116-f3c5-494e-91f6-223d5c16952b`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setNoticeInfo(res.data.item);
    setShopInfo(res.data.item.shop.item);
  };

  const handleNoticeList = async () => {
    const { shopId } = getCookies();
  const res = await instance.get(`shops/${shopId}/notices`);
    setCardList(res.data.items);
  };

  useEffect(() => {
    const stored = localStorage.getItem("watched");
      let watched = stored ? JSON.parse(stored) : [];
      watched.unshift(id);

      const uniqueWatched = [...new Set(watched)];
      localStorage.setItem("watched", JSON.stringify(uniqueWatched));
      setWatchedItem(cardList.filter((card) => uniqueWatched.includes(card.item.id)).slice(0, 6));
  }, [id, cardList]);

  console.log(watchedItem)

  useEffect(() => {
    handleNoticeList();
    handleNoticeInfo();
  }, []);

  return (
    <>
      <div className={cn("noticeTitle")}>
        <div>
          <Title>
            <Title.SubTitle subTitle={shopInfo.category} />
            <Title.MainTitle mainTitle={shopInfo.name} />
          </Title>
        </div>
        <div>
          <Panel>
            <Panel.Thumbnail src={shopInfo.imageUrl} alt={shopInfo.imageUrl} />
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
                <Panel.WorkHour startsAt={noticeInfo.startsAt} workHour={noticeInfo.workHour} isClosed={false} />
                <Panel.Address address={shopInfo.address1} isClosed={false} />
                <Panel.shopDescription description={shopInfo.description} />
              </div>
              <Button
                text={isFinished ? "취소하기" : "신청하기"}
                size="fixed"
                color={isFinished ? "secondary" : "primary"}
                handleButtonClick={() => {
                  isFinished ? handleCancelClick() : handleRegisterClick();
                }}
              />
            </div>
          </Panel>
        </div>
        <NoticeDescription noticeDescription={noticeInfo.description} />
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
            handleYesButtonClick={handleButtonClick}
            setIsModalOpen={setIsModalOpen}
          />
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
              closed={card.item.closed}
            />
          );
        })}
      </div>
    </>
  );
}