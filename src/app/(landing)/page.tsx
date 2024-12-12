"use client"
import Footer from "@/components/footer/Footer"
import Header from "@/components/header/Header"
import HomePage from "@/components/homepage/HomePage"

const LandingPage = () => {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <div className="relative">
        <HomePage />
        <div className="absolute top-0 left-0 w-full">
        <Header />
        </div>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  )
}

export default LandingPage
