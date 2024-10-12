import About from '@/components/about/about'
import Career from '@/components/career/Career'
import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import React from 'react'

const CareerPage = () => {
    return (
        <div className="flex min-h-screen flex-col justify-between">
            <div className="relative">

                <div className="absolute top-0 left-0 w-full">
                    <Header />
                </div>
                <Career />
            </div>
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    )
}

export default CareerPage