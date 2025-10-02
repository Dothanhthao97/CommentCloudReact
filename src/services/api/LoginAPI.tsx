// /src/components/LoginAPI/LoginAPI.ts
import axios from "axios";

export async function LoginAPI(user: string, pass: string) {
  const form = new FormData();
  form.append("account", JSON.stringify({ User: user, Pass: pass }));

  // const res = await axios.post(
  //   "/api-social/_layouts/15/FN.DPM.API/ApiAccount.ashx?func=authent&setc=3",

  //   form,
  //   {
  //     withCredentials: true,
  //     headers: {
  //       Accept: "*/*",
  //     },
  //   }
  // );
  // const userInf = res.data;
  localStorage.setItem("UserId", "fnadmin");
  return { UserId: "fnadmin" };
}
