import React from "react";
import Image from "next/image";

const Career = () => {
    const accreditions = [
        {
            logo: "/images/About/UIT.svg",
        },
        {
            logo: "/images/About/SE_Logo.png",
        },
        {
            logo: "/images/About/FPT.png",
        },
        {
            logo: "/images/About/Google.png",
        },
    ];

    const Benefits = [
        {
            title: "Health & Safety",
            description:
                "Provide you with a clean, safe, and healthy environment for your customers and employees. Clean offices improves employee moods, health and overall safety.",
            logo: "/images/Career/Health&Safe.svg",
        },
        {
            title: "High Morale",
            description:
                "Improve employee morale. Employees who work in a clean office are happier and happy employees mean reduced turnover and increased productivity.",
            logo: "/images/Career/HighMorale.svg",
        },
        {
            title: "Save Money",
            description:
                "Reduce costs and increase revenue - Clean offices are less expensive to maintain and outsourcing your cleaners saves on employee",
            logo: "/images/Career/SaveMoney.svg",
        },
        {
            title: "Full-service Partnership",
            description:
                "With our service, you'll no longer have to worry about restroom and cleaning equipments, because we manage it all for you and provide our own supplies and equipment",
            logo: "/images/Career/FullService.svg",
        },
    ];

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="relative z-[-999]">
                <Image
                    src="/images/Career/CareerBackground.svg"
                    alt="HeroIllustration"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }}
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="font-Averta-Bold text-center text-5xl mt-10">
                        <p className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight">Treat Employees Like</p>
                        <p className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight">Your Own Customers</p>
                        <button className="px-7 lg:px-14 py-2 lg:py-3 bg-[#1b78f2] rounded-xl text-base font-Averta-Semibold tracking-normal leading-loose text-center text-white">
                            Join Our Team
                        </button>
                    </div>
                </div>
            </div>
            {/* Accreditations */}
            <div className="mt-[140px] w-full h-[400px] relative">
                <Image
                    src="/images/HomePage/Background_feedback.svg"
                    alt="Logo_Grat"
                    fill
                    className="absolute inset-0 object-cover"
                />
                <div className="flex flex-col absolute inset-0 items-center justify-center">
                    <h2 className="text-white text-4xl font-Averta-Bold z-10 ">
                        <p>Our accreditions</p>
                    </h2>
                    <div className="container mx-auto mt-20">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
                            {accreditions.map((accredition) => (
                                <div
                                    key={accredition.logo}
                                    className="flex items-center justify-center"
                                >
                                    <div className="relative w-full h-[40px] sm:h[50px] md:h-[60px] lg:h-[70px] xl:h[80px]">
                                        <Image
                                            src={accredition.logo}
                                            alt="ClientLogo"
                                            fill
                                            className="object-contain filter grayscale"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* Benefits */}
            <div className="flex flex-col max-w-[1000px] pt-[112px] items-center justify-center">
                <div className="font-Averta-Bold xl:text-5xl text-2xl md:text-3xl lg:text-4xl  w-full flex flex-col gap-5">
                    <p>What can Shield Cleaning do for you?</p>
                </div>
            </div>
            <div className="flex w-full h-fit items-center justify-center mt-28">
  <div className="grid grid-cols-1 lg:grid-cols-2 max-w-[1000px] w-full gap-12 lg:gap-24">
    {Benefits.map(({ title, description, logo }, index) => (
      <div 
        key={index} 
        className="flex flex-col items-center text-center lg:items-start lg:text-left justify-center lg:justify-start gap-y-6 lg:gap-y-8"
      >
        <Image
          src={logo}
          alt="benefit"
          width={0}
          height={0}
          sizes="100vw"
          className="w-24 h-[70px] md:h-[80px] lg:h-[100px]"
        />
        <div className="flex flex-col gap-y-3">
          <p className="font-Averta-Bold text-2xl lg:text-3xl leading-tight lg:leading-snug">
            {title}
          </p>
          <p className="text-neutral-500 text-sm lg:text-base leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>

            {/* Make a request */}
            <div className="w-full h-[393px] relative mt-28 ">
                <Image
                    src="/images/Career/Request.svg"
                    alt="Logo_Grat"
                    fill
                    className="absolute inset-0 object-cover"
                />
                <div className="flex flex-col absolute inset-0 items-center justify-center">
                    <p className="font-Averta-Bold text-center mb-14 text-2xl md:text-3xl lg:text-4xl xl:text-5xl  leading-tight">
                        The Ultimate Cleaning Companion
                    </p>
                    <button className=" px-7 lg:px-14 py-2 lg:py-3 bg-[#1b78f2] rounded-xl text-base font-Averta-Semibold tracking-normal leading-loose text-center text-white">
                        Request a Quote
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Career;