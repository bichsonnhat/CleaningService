import { time } from "console";
import Image from "next/image";
import React from "react";

const FAQ = () => {
  const working_hours = [
    {
      day: "Monday - Friday",
      time: "8 AM - 9 PM",
    },
    {
      day: "Saturday",
      time: "8 AM - 6 PM",
    },
    {
      day: "Sunday",
      time: "8 AM - 2 PM",
    },
  ];

  const contact = [
    {
      icon: "/images/About/Address.svg",
      info: "Quarter 6, Linh Trung Ward, Thu Duc City, Ho Chi Minh City",
    },
    {
      icon: "/images/About/Phone.svg",
      info: "(+84) 123 456 789",
    },
    {
      icon: "/images/About/Mail.svg",
      info: "contact@group1.com",
    },
  ];

  const clients = [
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

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="relative">
        <Image
          src="/images/About/HeroBackground.svg"
          alt="HeroIllustration"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="font-Averta-Bold text-center text-5xl mt-10">
            <p>FAQ</p>
          </div>
        </div>
      </div>

      <div className="relative w-full h-[1000px] mt-[80px]">
        <div className="  inset-0 object-cover"></div>
        <div className="bg-[#eaeef4] pt-10 flex flex-col h-[1200px] inset-0 items-center justify-center">
          <p className="font-Averta-Bold text-center text-3xl">
            1. How much does your cleaning service cost?
          </p>
          <p className="font-Averta-Regular text-center max-w-[700px] p-6">
            Our pricing varies based on the size of your home, the type of
            service you need, and the frequency of cleaning. You can view our
            pricing details on our website or request a personalized quote
            through our booking form. We strive to keep our rates competitive
            and transparent, with no hidden fees.
          </p>
          <p className="font-Averta-Bold text-center text-3xl">
            2. How do I book a cleaning service?
          </p>
          <p className="font-Averta-Regular text-center max-w-[700px] p-6">
            Booking is easy! Simply visit our website, choose the service you
            need, and select a date and time that works for you. You can also
            call or email us to schedule an appointment. We'll confirm your
            booking and send you a reminder before your scheduled cleaning.
          </p>
          <p className="font-Averta-Bold text-center text-3xl">
            3. Do I need to provide cleaning supplies or equipment?
          </p>
          <p className="font-Averta-Regular text-center max-w-[700px] p-6">
            No, our cleaners come fully equipped with all the necessary cleaning
            supplies and tools. If you have specific products you'd like us to
            use, just let us know during the booking process.
          </p>
          <p className="font-Averta-Bold text-center text-3xl">
            4. Are your cleaners insured and background-checked?
          </p>
          <p className="font-Averta-Regular text-center max-w-[700px] p-6">
            Yes, all our cleaners are thoroughly background-checked, trained,
            and insured for your peace of mind. We prioritize safety and
            professionalism, ensuring a worry-free experience for our customers.
          </p>
          <p className="font-Averta-Bold text-center text-3xl">
            5. What areas do you serve?
          </p>
          <p className="font-Averta-Regular text-center max-w-[700px] p-6">
            We provide cleaning services in HCM CITY. If you're unsure whether
            we cover your location, please contact us for confirmation. We're
            continually expanding our service areas to meet customer demand.
          </p>
          <p className="font-Averta-Bold text-center text-3xl">
            6. How do you ensure the safety of your cleaning process?
          </p>
          <p className="font-Averta-Regular text-center max-w-[700px] p-6">
            Our cleaners follow strict safety protocols, including the use of
            eco-friendly and non-toxic cleaning products. We also adhere to
            hygiene standards and wear protective gear as needed. Your safety
            and satisfaction are our top priorities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
