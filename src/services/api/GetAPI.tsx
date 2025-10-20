// /src/api/getAPI.ts
import { AxiosRequestConfig } from "axios";
import axiosClient from "./axiosClient";

export async function getAPI<T = any>(
  url: string,
  params?: Record<string, any>,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const res = await axiosClient.get<T>(url, {
      params,
      ...config, // có thể override headers, v.v.
    });
    return res.data as T;
  } catch (err: any) {
    console.error("getAPI error:", err);
    throw err;
  }
}
