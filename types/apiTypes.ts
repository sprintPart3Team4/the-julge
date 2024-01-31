export type Address =
  | "서울시 종로구"
  | "서울시 중구"
  | "서울시 용산구"
  | "서울시 성동구"
  | "서울시 광진구"
  | "서울시 동대문구"
  | "서울시 중랑구"
  | "서울시 성북구"
  | "서울시 강북구"
  | "서울시 도봉구"
  | "서울시 노원구"
  | "서울시 은평구"
  | "서울시 서대문구"
  | "서울시 마포구"
  | "서울시 양천구"
  | "서울시 강서구"
  | "서울시 구로구"
  | "서울시 금천구"
  | "서울시 영등포구"
  | "서울시 동작구"
  | "서울시 관악구"
  | "서울시 서초구"
  | "서울시 강남구"
  | "서울시 송파구"
  | "서울시 강동구";

export type UpdateUser = {
  name: string;
  phone: string;
  address: Address;
  bio: string;
};

export type User = {
  id: string;
  email: string;
  type: "employer" | "employee";
  name?: string;
  phone?: string;
  address?: string;
  bio?: string;
  shop?: Shop;
};

export type Shop = {
  id: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
};

export type AuthContextType = {
  user: User | null;
  shop: Shop | null;
  isPending: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateMe: (formData: UpdateUser) => Promise<void>;
  updateShop: (method: any, formData: any) => Promise<void>;
};
