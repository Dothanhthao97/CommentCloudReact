// import axios, { AxiosRequestConfig } from "axios";

// async function PostAPI<T = any>(
//   url: string,
//   data?: any,
//   config?: AxiosRequestConfig
// ): Promise<T> {
//   try {
//     let body: any;
//     let headers: any = {};

//     if (data instanceof FormData) {
//       body = data;
//     } else if (typeof data === "object" && data !== null) {
//       const formData = new FormData();
//       formData.append("data", JSON.stringify(data));
//       body = formData;
//       headers["Content-Type"] = "multipart/form-data";
//     } else {
//       body = data;
//     }

//     const res = await axios.post<T>(url, body, {
//       withCredentials: true,
//       headers: {
//         ...headers,
//         ...(config?.headers || {}),
//       },
//       ...config,
//     });

//     return res.data as T;
//   } catch (err: any) {
//     console.error("PostAPI error:", err);
//     throw err;
//   }
// }
// export default PostAPI;
