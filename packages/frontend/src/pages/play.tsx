import dynamic from "next/dynamic";

const MyChart = dynamic(() => import("../ui/Selector"), { ssr: false });

export default function Play() {
  return <MyChart />;
}
