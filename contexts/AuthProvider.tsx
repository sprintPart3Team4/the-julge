import { useRouter } from "next/router";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import instance from "@/lib/axiosInstance";
import getCookies from "@/lib/getCookies";
import { AuthContextType, Shop, UpdateUser, User } from "@/types/apiTypes";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

type Values = {
  user: User | null;
  shop: Shop | null;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [values, setValues] = useState<Values>({
    user: null,
    shop: null,
  });

  const [isPending, setIsPending] = useState(true);

  const getMe = async (userId: string) => {
    const res = await instance.get(`users/${userId}`);
    const nextUser = res.data.item;
    const nextShop = res.data.item.shop === null ? null : res.data.item.shop.item;

    setValues((prev) => ({
      ...prev,
      user: nextUser,
      shop: nextShop,
    }));
    setIsPending(false);

    return nextShop?.id;
  };

  // 로그인 후, 유저 정보까지 한꺼번에 저장
  const login = async (email: string, password: string) => {
    const res = await instance.post("token", {
      email,
      password,
    });
    const { token, user } = res.data.item;

    const shopId = await getMe(user.item.id);

    document.cookie = `token=${token}`;
    document.cookie = `userId=${user.item.id}`;

    if (shopId) {
      document.cookie = `shopId=${shopId}`;
    }
  };

  const logout = async () => {
    document.cookie = "";
    setValues((prev) => ({
      ...prev,
      user: null,
      shop: null,
    }));
  };

  // 유저 정보 등록 및 수정
  const updateMe = async (formData: UpdateUser) => {
    const { token } = getCookies();

    const res = await instance.put(`users/${values?.user?.id}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setValues((prev) => ({
      ...prev,
      user: res.data.item,
    }));
  };

  const registerShop = async (formData: Shop) => {
    const { token } = getCookies();

    const res = await instance.post("shops", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setValues((prev) => ({
      ...prev,
      shop: res.data.item,
    }));

    const shopId = res.data.item.id;
    document.cookie = `shopId=${shopId}`;
  };

  const updateShop = async (formData: Shop) => {
    const { token, shopId } = getCookies();

    const res = await instance.put(`shops/${shopId}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setValues((prev) => ({
      ...prev,
      shop: res.data.item,
    }));
  };

  // 새로 고침했을 때, 로그인이 풀리지 않도록 ??
  useEffect(() => {
    const { userId, token } = getCookies();

    if (userId && token) {
      getMe(userId);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: values.user,
        shop: values.shop,
        isPending,
        login,
        logout,
        updateMe,
        registerShop,
        updateShop,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(required?: boolean) {
  const router = useRouter();

  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("반드시 AuthProvider 안에서 사용해야 합니다.");
  }

  useEffect(() => {
    if (required && !context.user && !context.isPending) {
      router.push("/signin");
    }
  }, [context.user, router, required, context.isPending]);

  return context;
}

// 1. 어떤 페이지에서 로그인이 안되어있을 경우, 로그인 페이지로 리다이렉트가 필요한 경우에는 useAuth(true); 작성

// 2. 로그인이 되어 있는 경우, 로그인/회원가입 페이지로 접근한다면 마이페이지로 리다이렉트 시키고 싶을 때
// const {user} = useAuth();
// const router = useRouter();

// useEffect(() => {
//   if (user) {
//     router.push(이동시키고 싶은 페이지);
//   }
// }, [user, router]);
