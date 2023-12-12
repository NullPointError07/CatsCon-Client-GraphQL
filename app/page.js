import Banner from "@/components/Banner";
import Accordion from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import Sponsons from "@/components/Sponsons";
import VideoFeed from "@/components/VideoFeed";

export default function Home() {
  return (
    <main>
      <Banner />
      <div className="2xl:px-[140px] xl:px-[80px] lg:px-[50px] md:px-[30px] px-[22px] ">
        <VideoFeed />
        <Accordion />
      </div>
      <Newsletter />
      <Sponsons />
    </main>
  );
}
