'use client'

import React from 'react'
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const days = [
  { dayInMonth: "1", active: true },
  { dayInMonth: "2", active: false },
  { dayInMonth: "3", active: false },
  { dayInMonth: "4", active: false },
  { dayInMonth: "5", active: false },
  { dayInMonth: "6", active: false },
  { dayInMonth: "7", active: false },
  { dayInMonth: "8", active: false },
  { dayInMonth: "9", active: false },
  { dayInMonth: "10", active: false },
  { dayInMonth: "11", active: false },
  { dayInMonth: "12", active: false },
  { dayInMonth: "13", active: false },
  { dayInMonth: "14", active: false },
  { dayInMonth: "15", active: false },
  { dayInMonth: "16", active: false },
  { dayInMonth: "17", active: false },
  { dayInMonth: "18", active: false },
  { dayInMonth: "19", active: false },
  { dayInMonth: "20", active: false },
  { dayInMonth: "21", active: false },
  { dayInMonth: "22", active: false },
  { dayInMonth: "23", active: false },
  { dayInMonth: "24", active: false },
  { dayInMonth: "25", active: false },
  { dayInMonth: "26", active: false },
  { dayInMonth: "27", active: false },
  { dayInMonth: "28", active: false },
  { dayInMonth: "29", active: false },
  { dayInMonth: "30", active: false },
  { dayInMonth: "31", active: false },
]

const displayDays = days.map((day) => {
  return (
    <CarouselItem className="basis-1/7 pl-4" key={day.dayInMonth}>  
      <Card>
        <CardContent className={`flex justify-center items-center pt-[23px] bg-white h-[55px] w-[132px] rounded-[10px] font-Averta-Semibold text-xl border ${day.active ? "text-[#1A78F2] border-[#1A78F2]" : "text-[#4f6071] border-[#d3d8dd]"} hover:text-white hover:bg-[#1A78F2]`}>
          {day.dayInMonth}
        </CardContent>
      </Card>
    </CarouselItem>
  )
})


const Step_3 = () => {
  return (
    <div className="h-full w-full">
      <div className="w-1/2 m-auto p-4">
        <div className="justify-center h-max">
          <p className="text-4xl text-center font-Averta-Bold mb-2 mt-[50px] ">
            Book Timing
          </p>
          <p className="text-[20px] text-center text-[#88939D] font-Averta-Regular leading-[25px]">
            Save even more by booking off-peak dates and times.
          </p>
        </div>
    </div>
    <Carousel className="w-full max-w-6xl mx-auto" opts={{ loop: true }}>
      <CarouselContent>
        {displayDays}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

    <div className="grid w-3/4 m-auto justify-center gap-4 mt-[40px]">
      <Button className="bg-white h-[73px] w-[400px] rounded-[10px] font-Averta-Semibold text-xl text-[#1A78F2] border border-[#1A78F2] hover:text-white">
        <div className="grid grid-cols-2">
            <p className="text-base font-Averta-Semibold leading-[23px] tracking-tight text-left">Flexible</p>
            <p className="text-xs font-Averta-Semibold leading-[14px] tracking-tight text-right self-center">Save $8.10 off</p>
            <p className="text-sm font-Averta-Regular leading-[19px] tracking-tight text-left">Cleaner will arrive between 9am-4pm</p>
        </div>
      </Button>
      <Button className="bg-white h-[73px] w-[400px] rounded-[10px] font-Averta-Semibold text-base leading-[23px] tracking-tight text-[#4f6071] border border-[#d3d8dd] hover:text-white">08:00am</Button>
      <Button className="bg-white h-[73px] w-[400px] rounded-[10px] font-Averta-Semibold text-base leading-[23px] tracking-tight text-[#4f6071] border border-[#d3d8dd] hover:text-white">08:30am</Button>
      <Button className="bg-white h-[73px] w-[400px] rounded-[10px] font-Averta-Semibold text-base leading-[23px] tracking-tight text-[#1A78F2] border border-[#1A78F2] hover:text-white">09:00am</Button>
      <Button className="bg-white h-[73px] w-[400px] rounded-[10px] font-Averta-Semibold text-base leading-[23px] tracking-tight text-[#4f6071] border border-[#d3d8dd] hover:text-white">09:30am</Button>
      <Button className="bg-white h-[73px] w-[400px] rounded-[10px] font-Averta-Semibold text-base leading-[23px] tracking-tight text-[#4f6071] border border-[#d3d8dd] hover:text-white">10:00am</Button>
    </div>
    
    <div className="flex justify-center items-center mt-[35px]">
          <Button className="w-[165px] h-[55px] bg-[#1A78F2] text-lg text-white font-Averta-Semibold">Next</Button>
    </div>
</div>

  )
}

export default Step_3