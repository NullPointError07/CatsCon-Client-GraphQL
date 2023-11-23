import Image from "next/image";

const Sponsons = () => {
  const sponsorImages = [
    { image: "/sponsor1.jpg" },
    { image: "/sponsor2.jpg" },
    { image: "/sponsor3.jpg" },
    { image: "/sponsor4.jpg" },
    { image: "/sponsor5.jpg" },
  ];

  return (
    <div className="text-center text-lg md:text-2xl my-8">
      <h1>Thank you to our partners whose support makes our work possible</h1>
      <div className="flex flex-col lg:flex-row justify-around items-center space-y-6 mt-6">
        {sponsorImages.map((img, index) => (
          <Image
            key={index}
            src={img.image}
            alt={`Sponsor ${index + 1}`}
            width={150}
            height={70}
          />
        ))}
      </div>
    </div>
  );
};

export default Sponsons;
