import axios, { AxiosRequestConfig } from "axios";

async function PostAPI<T = any>(
  url: string,
  data?: any, // object như { Key: 'f', ItemId: '124468' }
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    // Gửi theo FormData, với key là "data", value là JSON string
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    const res = await axios.post<T>(url, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
        ...(config?.headers || {}),
      },
      ...config,
    });

    return res.data as T;
  } catch (err: any) {
    console.error("PostAPI error:", err);
    throw err;
  }
}

export default PostAPI;
