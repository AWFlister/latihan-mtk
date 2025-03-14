import { LatihanMTK } from "~/pages/latihan_mtk/latihan_mtk";
import type { Route } from "./+types/home";
import { TopNavbar } from "~/pages/latihan_mtk/components/TopNavbar";
import { BottomBar } from "~/pages/latihan_mtk/components/BottomBar";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Latihan MTK" },
    { name: "description", content: "Latihan MTK by AWFlister" },
  ];
}

export default function Other() {
  return (
    <>
      <TopNavbar />
      <LatihanMTK />
      <BottomBar />
    </>
  )
}
