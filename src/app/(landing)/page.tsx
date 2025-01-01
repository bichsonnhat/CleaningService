"use client"
import Footer from "@/components/footer/Footer"
import Header from "@/components/header/Header"
import HomePage from "@/components/homepage/HomePage"
import { useEffect, useState } from "react"
import { ClipLoader } from "react-spinners"

const LandingPage = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000) // Adjust timing as needed

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <ClipLoader color="#2A88F5" loading={loading} size={30} />
      </div>
    )
  }
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
