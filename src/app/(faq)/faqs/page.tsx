import FAQ from "@/components/faq/faq";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import React from "react";

const Page = () => {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <div className="">
        <FAQ />
        <div className="absolute top-0 left-0 w-full">
          <Header />
        </div>
      </div>
    </div>
  );
};

export default Page;
