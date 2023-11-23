import Banner from "@/components/Banner";
import Accordion from "@/components/FAQ";
import MainFeed from "@/components/MainFeed";
import Newsletter from "@/components/Newsletter";
import Sponsons from "@/components/Sponsons";

export default function Home() {
  return (
    <main>
      <Banner />
      <div className="2xl:px-[140px] xl:px-[80px] lg:px-[50px] md:px-[30px] px-[22px] ">
        <MainFeed />
        <Accordion />
      </div>
      <Newsletter />
      <Sponsons />
    </main>
  );
}
