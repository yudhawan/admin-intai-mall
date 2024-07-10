import DashboardContainer from "@/container/DashboardContainer/DashboardContainer";
import { checkingTokenLoginValidation } from "./api/libsServer/serverServices";

export default async function Home() {
  await checkingTokenLoginValidation()
  return (
    <main className="">
      {/* <DashboardContainer/> */}
    </main>
  );
}
