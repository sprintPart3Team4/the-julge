import { Dispatch, SetStateAction } from "react";
import instance from "./axiosInstance";
import { ApplicationList, NoticeDetail } from "@/types/apiTypes";

export const getNotice = async (
  shopId: string,
  noticeId: string,
  setState: Dispatch<SetStateAction<NoticeDetail | undefined>>
) => {
  const res = await instance.get(`shops/${shopId}/notices/${noticeId}`);
  setState(res.data.item);
};

export const getApplicationList = async (
  shopId: string,
  noticeId: string,
  limit: number,
  setCountState: Dispatch<SetStateAction<number>>,
  setDataListState: Dispatch<SetStateAction<ApplicationList | undefined>>,
  pageNumber: number = 1
) => {
  const offset = (pageNumber - 1) * limit;
  const query = `?offset=${offset}&limit=${limit}`;
  const res = await instance.get(`shops/${shopId}/notices/${noticeId}/applications?${query}`);
  setCountState(res.data.count);
  setDataListState(res.data.items);
};
