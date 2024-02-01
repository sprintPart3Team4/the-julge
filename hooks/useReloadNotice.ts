import { useEffect } from "react";
import axios from "axios";
import instance from "@/pages/api/axios";
import getCookies from "@/lib/getCookies";

export default function useReloadNotice() {
    const { shopId } = getCookies();
    try {
        await instance.get()
    }
}