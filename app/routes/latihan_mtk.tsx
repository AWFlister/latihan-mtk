import { TopNavbar } from "~/pages/latihan_mtk/components/TopNavbar";
import type { Route } from "./+types/home";
import { LatihanMTK } from "~/pages/latihan_mtk/latihan_mtk";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Latihan MTK" },
    { name: "description", content: "Latihan MTK" },
  ];
}

export default function LatihanMTKPage() {
  return (
    <>
      <TopNavbar />
      <LatihanMTK />
    </>
  );
}
