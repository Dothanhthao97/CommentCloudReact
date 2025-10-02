// /src/api/getAPI.ts
import axios, { AxiosRequestConfig } from "axios";

export async function getAPI<T = any>(
  url: string,
  params?: Record<string, any>,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const res = await axios.get<T>(url, {
      withCredentials: true,
      params,
      ...config, // cho phép override headers nếu cần
    });
    return res.data as T;
  } catch (err: any) {
    console.error("getAPI error:", err);
    throw err;
  }
}
